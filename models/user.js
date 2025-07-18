import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [ /* /^(?=.{1,100}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/ */ /^[A-Za-zÀ-ÖØ-öø-ÿ0-9._\s]{1,100}$/, "Username invalid, it should contain 1-100 alphanumeric letters and be unique!"]
  }, 
  image: {
    type: String,
  }
});

const User = models.User || model("User", userSchema);
export default User;

