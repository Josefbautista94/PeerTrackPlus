import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // Basic identity
    name: { type: String, required: true, trim: true },

    // Unique login identifier
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Hidden by default when querying users
    password: { type: String, required: true, select: false },

    // App roles
    role: {
      type: String,
      enum: ["learner", "tutor", "admin"],
      default: "learner",
    },

    // Tutors should have skills so matching works
    skills: {
      type: String,
      required: function () {
        return this.role === "tutor";
      },
      default: "",
    },

    // Optional scoring field for ranking or gamification
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Hash password any time it is created or changed using save()/create()
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare a plain password with the stored hash
userSchema.methods.isCorrectPassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;