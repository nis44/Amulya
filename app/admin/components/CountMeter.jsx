"use client";

import { useOrdersCounts } from "@/lib/firestore/orders/read_count";
import { useProductCount } from "@/lib/firestore/products/count/read_client";
import { useUsersCount } from "@/lib/firestore/user/read_count";

export default function CountMeter() {
  const { data: totalProduct } = useProductCount();
  const { data: totalUsers } = useUsersCount();
  const { data: ordersCounts } = useOrdersCounts();
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-5">
      <Card imgURL={"/box.png"} title={"Products"} value={totalProduct ?? 0} />
      <Card
        imgURL={"/received.png"}
        title={"Orders"}
        value={ordersCounts?.totalOrders ?? 0}
      />
      <Card
        imgURL={"/profit-up.png"}
        title={"Revenue"}
        value={`₹ ${(ordersCounts?.totalRevenue ?? 0) / 100}`}
      />
      <Card imgURL={"/team.png"} title={"Customer"} value={totalUsers ?? 0} />
    </section>
  );
}

function Card({ title, value, imgURL }) {
  return (
    <div className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300
      border border-[#EBD1C4] hover:border-[#EBD1C4]/80">
      
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-serif font-bold text-[#5E121D]">
            {value}
          </h1>
          <p className="text-sm font-medium text-[#8A1A2B]/90 uppercase tracking-wide">
            {title}
          </p>
        </div>
        
        <div className="p-3 rounded-lg bg-[#EBD1C4]/30 transition-colors
          group-hover:bg-[#EBD1C4]/50">
          <img 
            className="h-8 w-8" 
            src={imgURL} 
            alt={title} 
            style={{ filter: "invert(18%) sepia(15%) saturate(1435%) hue-rotate(314deg) brightness(90%) contrast(90%)" }}
          />
        </div>
      </div>

      <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[#EBD1C4]/10 rounded-full 
        transition-all duration-300 group-hover:scale-150" />
    </div>
  );
}
