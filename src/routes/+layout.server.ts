// @ts-ignore
export async function load({ locals }) {
    return {
        user : {
            username : locals?.user?.username,
            bio      : locals?.user?.bio,
        },
        cookies : locals?.cookies,
    };
}
