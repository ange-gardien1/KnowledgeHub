import { signIn } from "@/app/auth";
import Image from "next/image";

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
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-white font-semibold rounded-md shadow-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M23.1 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.6c-2.8 2.6-4.1 6.3-4.1 10.3 0 1.2.1 2.4.3 3.6l-5.8-.1c-3.4-3.2-5.4-7.8-5.4-12.8 0-4.5 1.6-8.8 4.4-12.2L6.5 8.5c-3.2 3.1-5.2 7.3-5.2 11.6 0 4.4 1.6 8.8 4.4 12.2L12 27.5c-3.4-3.4-5.3-8-5.3-12.8 0-4.4 1.6-8.8 4.4-12.2L12 8.1v4.2h9.6z"/></svg>
              Sign in with Google
            </button>
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
