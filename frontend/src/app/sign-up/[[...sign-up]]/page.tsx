import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="flex justify-center py-24">
      <SignUp path='/sign-up'/>
    </div>
  );
}