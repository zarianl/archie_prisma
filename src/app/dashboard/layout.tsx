import React from "react";
import Sidebar from "@/components/Sidebar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="flex h-screen">
        <div className="bg-gray-200 w-60 p-4">
          <h3 className="text-xl font-semibold mb-4">Assistants</h3>
          <Sidebar />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="h-16 bg-white shadow flex items-center justify-between px-4">
            <span>User Info</span>
            <button className="bg-red-500 text-white py-1 px-4 rounded">Logout</button>
          </div>

            {children}

        </div>
      </div>
  )
}
