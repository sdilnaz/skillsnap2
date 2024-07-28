import { SignUp } from "@clerk/nextjs";
import React from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp path='/sign-up'/>
    </div>
  );
}