// app/success/page.tsx
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase from Avdhut Agro. Your order is being processed.</p>
        <Link 
          href="/" 
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition w-full block"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}