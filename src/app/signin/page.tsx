import { signIn } from "@/app/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";


export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sign-In Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-10 px-4 md:px-12">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Welcome Back!</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to access your Knowledge Hub account and start collaborating.</p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
            className="mb-4"
          >
            <Button
              type="submit"
              className="w-full gap-2 py-3 px-4 border border-transparent text-black font-semibold rounded-md shadow-lg bg-neutral-300 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors"
            >
             <FcGoogle size={34}/>
             <span> Sign in with Google </span> 
            </Button>
          </form>
          {/* <p className="text-center text-gray-600 mt-4">New here? <a href="/signup" className="text-blue-600 hover:underline">Create an account</a></p> */}
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gray-200">
        <div className="relative w-full h-full">
          <Image
            src="https://images.pexels.com/photos/2928232/pexels-photo-2928232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-lg opacity-80" 
          />
        </div>
      </div>
    </div>
  );
}
