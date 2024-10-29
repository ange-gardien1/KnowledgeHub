import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 text-center bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-600">
          Only users with an admin role can access this page.
        </p>
        <Link href="/dashboard">Go to Dashbord</Link>
      </div>
    </div>
  );
}
