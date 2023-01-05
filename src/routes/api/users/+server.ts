import {
    UserModel,
} from "src/models";

export async function GET() {
    const users = await UserModel.find({});

    return new Response(JSON.stringify({
        data : users.map(({ username, bio }) => ({ username, bio })),
    }));
}
