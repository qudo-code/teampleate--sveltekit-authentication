import type { RequestEvent } from "@sveltejs/kit";

import bcrypt from "bcrypt";

import {
    UserModel,
} from "src/models";

import token from "src/util/token.js";

export async function POST({ request }: RequestEvent) {
    const {
        username = "",
        password = "",
        bio = "",
    } = await request.json();
    
    const user = await UserModel.findOne({
        username,
    });

    if(user) {
        return new Response("{}",
            {
                status : 501,
            });
    }
 
    const newUser = new UserModel({
        username,
        password : bcrypt.hashSync(password, 10),
        bio,
    });

    await newUser.save();

    const newToken = token.sign({
        username,
        bio,
    });

    const tokenCookie = token.cookie(newToken);
    
    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    headers.append("Set-Cookie", tokenCookie);
    
    return new Response("{}",
        {
            headers,
        });
}
