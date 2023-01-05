/* eslint-disable max-statements */
import type { Handle } from "@sveltejs/kit";
import type { Cookies, User } from "./src/types";

import cookie from "cookie";

import connectDatabase from "src/util/connect-mongo";

import token from "src/util/token";

const protectedRoutes = [
    "/",
];

// Verify cookies/token/session
const validateSession = async (cookies:Cookies) => {
    // If is protected, verify token and session.
    try {
        // Get out if we don't even have these cookies
        if(!cookies.token) {
            // eslint-disable-next-line no-console
            console.log("Error: No cookies");

            return {
                token : false,
                user  : false,
            };
        }
        
        // { data : { ...user }} || undefined
        const decoded = token.decode(cookies.token);
        
        // Get out if we have any trouble parsing the token
        if(!decoded) {
            throw new Error("Invalid token");
        }
        
        // Other endpoints can access locals.
        const data = decoded?.data;

        // Sign and attach a fresh token.
        const newToken = token.sign(data);
        
        return {
            token : newToken,
            user  : data,
        };
    } catch(error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return {};
    }
};

const initDatabase = async () => {
    // This fails during prerendering, so let it.
    try {
        await connectDatabase();

        // eslint-disable-next-line no-console
        console.log("Mongo connected");
    } catch(error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

export const handle: Handle = async ({ event, resolve }) => {
    // Connect to database
    await initDatabase();

    // If path is protected, extract and verify user cookies.
    const cookies = cookie.parse(event?.request?.headers.get("cookie") || "");

    // Use user cookies to reach out to database and validate their session.
    const {
        token : newToken = false,
        user = false,
    } = await validateSession(cookies);

    // Set these for +layout files and endpoints to access.
    // These need to be set before resolve().
    event.locals.cookies = cookies;
    event.locals.user = user;

    console.log("local", event.locals);

    const isProtected = protectedRoutes.includes(event.url.pathname);

    // Redirect if this is the page that requires authentication but we didn't find any.
    const unauthorized = isProtected && !newToken;

    // If unauthorized or logging out, redirect them and clear cookies.
    if(unauthorized || event.url.pathname === "/api/user/logout") {
        const headers = new Headers();
        
        headers.append("Location", "/app/login");
        headers.append("Content-Type", "application/json");
        headers.append("Set-Cookie", "token=; path=/; HttpOnly; max-age=0");
        headers.append("Set-Cookie", "session=; path=/; HttpOnly; max-age=0");
        
        return new Response("{}",
            {
                status : 302,
                headers,
            });
    }

    // If we made it this far, we can assume the user is allowed to view the page.
    // Resolve the response, attach the new token, return the response.
    const response = await resolve(event);

    // If we have a new token, add it to the request unless we are logging out.
    if(newToken) {
        response.headers.append("Set-Cookie", token.cookie(newToken));
    }
    
    return response;
};
