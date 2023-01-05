// Import these to communicate with the database throughout the app.
import mongoose from "mongoose";

import {
    UserSchema,
} from "./schemas";

export const UserModel = mongoose.model("user", UserSchema);
