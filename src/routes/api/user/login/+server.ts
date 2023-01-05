import bcrypt from "bcrypt";

import {
    UserModel,
} from "src/models";

import token from "src/util/token.js";

export async function POST({ request }) {
    const {
        username = "",
        password = "",
    } = await request.json();
    
    const user = await UserModel.findOne({
        username,
    });

    const passwordIsValid = bcrypt.compareSync(password, user?.password);

    if(!passwordIsValid) {
        return new Response("{}",
            {
                status : 501,
            });
    }

    const newToken = token.sign({
        username : user?.username,
        bio      : user?.bio,
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
