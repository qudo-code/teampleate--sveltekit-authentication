import mongoose from "mongoose";

import {
    env
} from "$env/dynamic/private";

const {
    ENV_MONGO,
} = env;

export default async () => {
    // Connect with existing connection.
    if(Number(mongoose?.connection?.readyState) === 1) {
        return mongoose.connection;
    }

    mongoose.set("strictQuery", true);

    const connection = mongoose.connect(ENV_MONGO, {
        // @ts-ignore
        // The mongoose docs suggest we use these settings but mongoose TS doesn't like it.
        useNewUrlParser    : true,
        useUnifiedTopology : true,
    });

    return connection;
};
