import type { InferSchemaType } from "mongoose";

import type {
    UserSchema
} from "src/schemas";

// DATABASE TYPES
// Types that are also database models are inferred from the Mongoose schemas in src/schemas.
export type User = InferSchemaType<typeof UserSchema>

// GENERAL TYPES
export interface Cookies {
    token?: string,
}
