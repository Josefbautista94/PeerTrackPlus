import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: { type: String, required: true}, 
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, select: false },
    score: { type: Number, default: 0},
    role: { type: String, enum: ["learner", "alumni", "admin"], default: "learner"}
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;