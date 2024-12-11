"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log("Login with", { email, password });
    setIsLoading(false);
  };

  const handleGoogleSignUp = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By Signing up, you agree to our {""}
          <Link href="/privacy">
            <span className="text-blue-600">Privacy Policy</span>
          </Link>
          {""} and{""}
          <Link href="/terms">
            <span className="text-blue-600">Terms</span>
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-7">
        <div className="space-y-4">
          <Input name="name" type="text" placeholder="Enter your Name" />
          <Input name="email" type="email" placeholder="Enter your Email" />
          <Input name="password" type="password" placeholder="Enter password" />
          <Button size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
      </CardContent>

      <div className="px-7">
        <Separator />
      </div>

      <CardContent className="p-7">
        <Button
          size="lg"
          className="w-full gap-2 py-3"
          onClick={handleGoogleSignUp}
        >
          <FcGoogle size={34} />
          <span>Sign in with Google</span>
        </Button>
      </CardContent>

      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <Link href="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
