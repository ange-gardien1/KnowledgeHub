import { signIn } from "@/app/auth";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 overflow-auto py-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Sign in with Google</h2>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
            className="mb-3"
          >
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-black font-semibold rounded-md shadow-sm bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
            >
            
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="relative w-3/4 h-3/4">
          <Image
            src="https://images.pexels.com/photos/2928232/pexels-photo-2928232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
