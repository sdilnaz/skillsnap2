"use server";

import User from "@/models/userModel";
import  connectToMongoDB from "@/lib/db"

export async function createUser(user: any) {
  try {
    await connectToMongoDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}