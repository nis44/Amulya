"use client";

import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F9F6F4] p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Form Section */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-3">
            <Form />
          </div>
        </div>

        {/* List Section */}
        <div className="lg:w-2/3">
            <ListView />
        </div>
      </div>
    </main>
  );
}
