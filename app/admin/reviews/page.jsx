import ListView from "./components/ListView";

export default function Page() {
  return (
    <main className="flex flex-col gap-6 p-6 bg-[#F9F6F4] min-h-screen">
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-[#EBD1C4]">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D] tracking-tight">
          Customer Reviews
        </h1>
        <div className="flex items-center gap-3">
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#EBD1C4] overflow-hidden">
        <ListView />
      </div>
    </main>
  );
}
