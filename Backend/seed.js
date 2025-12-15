import dotenv from "dotenv";
dotenv.config();

import connect from "./controllers/dbConnect.js";
import User from "./models/userSchema.js";
import Request from "./models/requestSchema.js";

import userSeed from "./data/userSeed.js";
import requestSeed from "./data/requestSeed.js";

import bcrypt from "bcrypt";

async function seedDatabase() {
  try {
    await connect();

    // Clear collections
    await User.deleteMany({});
    await Request.deleteMany({});

    // IMPORTANT: insertMany does NOT trigger pre("save") hashing middleware
    // So we hash passwords manually before insertMany
    const hashedUsers = await Promise.all(
      userSeed.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        return { ...u, password: hashedPassword };
      })
    );

    await User.insertMany(hashedUsers);
    await Request.insertMany(requestSeed);

    console.log("✅ Database seeded successfully with hashed passwords!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();