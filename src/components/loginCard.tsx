// "use client";

// import { FcGoogle } from "react-icons/fc";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { trpc } from "@/app/_trpc/client";
// import { useRouter } from "next/navigation";

// export const LoginCard = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const loginMutation = trpc.users.loginuser.useMutation({
//     onSuccess: (data) => {
//      router.push("/dashboard");
//     },
//     onError: (error) => {
//       console.error("Login failed:", error.message);
//       alert(error.message);
//     },
//   });

//   const handleLogin = async () => {
//     if (!email || !password) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const result = await signIn("credentials", {
//         email,
//         password,
//         redirect: false, // Prevent immediate redirect
//       });

//       if (result?.error) {
//         alert("Invalid email or password.");
//         console.error("Login failed:", result.error);
//       } else {
//         // Navigate to the dashboard on successful login
//         router.push("/dashboard");
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     await signIn("google", { callbackUrl: "/dashboard" });
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <Card className="w-full h-full md:w-[487px] border-none shadow-none">
//       <CardHeader className="flex items-center justify-center text-center p-7">
//         <CardTitle className="text-2xl">Welcome Back!</CardTitle>
//       </CardHeader>
//       <div className="p-2 mb-2">
//         <Separator />
//       </div>
//       <CardContent className="p-7">
//         <div className="space-y-4">
//           <div>
//             <Input
//              type="email"
//              placeholder="Enter your Email Address"
//              aria-label="Email Address"
//              value={email}
//              onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <Input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <Button
//             size="lg"
//             className="w-full"
//             onClick={handleLogin}
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </Button>
//         </div>
//       </CardContent>
//       <div className="px-7">
//         <Separator />
//       </div>
//       <CardContent className="p-7">
//         <Button
//           size="lg"
//           className="w-full gap-2 py-3"
//           onClick={handleGoogleSignIn}
//         >
//           <FcGoogle size={34} />
//           <span>Sign in with Google</span>
//         </Button>
//       </CardContent>
//       <div className="px-7">
//         <Separator />
//       </div>
//       <CardContent className="p-7 flex items-center justify-center">
//         <p>
//           Don&apos;t have an account?
//           <Link href="/signup">
//             <span className="text-blue-500"> Sign Up </span>
//           </Link>
//         </p>
//       </CardContent>
//     </Card>
//     </div>
//   );
// };

"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        alert("Invalid email or password.");
        console.error("Login failed:", result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
        <CardHeader className="flex items-center justify-center text-center p-7">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        </CardHeader>
        <div className="p-2 mb-2">
          <Separator />
        </div>
        <CardContent className="p-7">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              size="lg"
              className="w-full"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </CardContent>
        <Separator />
        <CardContent className="p-7">
          <Button
            size="lg"
            className="w-full gap-2 py-3"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={34} />
            <span>Sign in with Google</span>
          </Button>
        </CardContent>
        <Separator />
        <CardContent className="p-7 flex items-center justify-center">
          <p>
            Don&apos;t have an account?
            <Link href="/signup">
              <span className="text-blue-500"> Sign Up </span>
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
