import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 overflow-auto py-10">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Create an Account</h2>
          <form className="mb-6">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-white font-semibold rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
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
