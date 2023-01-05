import type { User } from "src/types";

// @ts-ignore
import jwt from "jsonwebtoken";

const tokenExp = "7h";
const oneDay = 86400;
const cookieExp = oneDay * 7;
const cookieName = "token";

import {
    env
} from "$env/dynamic/private";

const {
    ENV_JWT_SECRET,
} = env;

const token = {
    // @ts-ignore
    sign : (data:any, exp:number = cookieExp) =>
    // Generate a JWT they can use to get/modify their profile.
    // Token expires in 2h to provide buffer for cookie.
        jwt.sign({
            data,
        }, ENV_JWT_SECRET, { expiresIn : exp }),

    decode : (token:string) => {
        try {
            return jwt.verify(token, ENV_JWT_SECRET);
        } catch(error) {
            return;
        }
    },

    cookie : (data:string) => `${cookieName}=${data}; path=/; max-age=${cookieExp}; Secure; HttpOnly;`,
};

export default token;
