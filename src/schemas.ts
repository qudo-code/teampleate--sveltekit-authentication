// IMPORTANT
// Be sure to register new schemas in src/models
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type : String,
    },
    password : {
        type : String,
    },
    bio : {
        type     : String,
    },
}, { timestamps : true });

// // Method to set salt and hash the password for a user
// UserSchema.methods.setPassword = function(password:string) {
//     this.hash = bcrypt.hashSync(password, 10);
// };
     
// // Method to check the entered password is correct or not
// UserSchema.methods.validPassword = function(password:string) {
//     const hash = bcrypt.hashSync(password, 10);
    
//     return bcrypt.compareSync(hash, this.hash);
// };

export {
    UserSchema,
};
