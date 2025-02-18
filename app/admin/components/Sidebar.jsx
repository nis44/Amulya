"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  Cat,
  Layers2,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  PackageOpen,
  ShieldCheck,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Sidebar() {
  const menuList = [
    {
      name: "Dashboard",
      link: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: <PackageOpen className="h-5 w-5" />,
    },
    {
      name: "Categories",
      link: "/admin/categories",
      icon: <Layers2 className="h-5 w-5" />,
    },
    // {
    //   name: "Brands",
    //   link: "/admin/brands",
    //   icon: <Cat className="h-5 w-5" />,
    // },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      name: "Customers",
      link: "/admin/customers",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Reviews",
      link: "/admin/reviews",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Collections",
      link: "/admin/collections",
      icon: <LibraryBig className="h-5 w-5" />,
    },
    {
      name: "Admins",
      link: "/admin/admins",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];
  return (
    <section className="sticky top-0 flex flex-col gap-10 bg-[#5E121D] border-r border-[#EBD1C4]/20 px-5 py-3 h-screen overflow-hidden w-[260px] z-50">
    <div className="flex justify-center py-4">
      <Link href={`/`}>
        {/* <img className="h-8  brightness-100" src='/logo.png' alt="Website Logo" /> */}
        
               <div className="text-2xl font-bold text-[#EBD1C4] font-playfair">
        Amulya
      </div>
      </Link>
    </div>
      
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4">
        {menuList?.map((item, key) => (
          <Tab item={item} key={key} />
        ))}
      </ul>
      <div className="flex justify-center">
        <button
          onClick={async () => {
            try {
              await toast.promise(signOut(auth), {
                error: (e) => e?.message,
                loading: "Loading...",
                success: "Successfully Logged out",
              });
            } catch (error) {
              toast.error(error?.message);
            }
          }}
          className="flex gap-2 items-center px-3 py-2 hover:bg-[#EBD1C4] text-white hover:text-[#5E121D] rounded-xl w-full justify-center transition-all duration-300 group"
          >
          <LogOut className="h-5 w-5 text-current group-hover:text-[#5E121D]" /> Logout
        </button>
      </div>
    </section>
  );
}

function Tab({ item }) {
  const pathname = usePathname();
  const isSelected = pathname === item?.link;
  return (
<Link href={item?.link}>
  <li
    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
    ${
      isSelected 
        ? "bg-[#5E121D] border-l-4 border-[#EBD1C4] text-white" 
        : "bg-[#F9F6F4] text-[#5E121D] hover:bg-[#EBD1C4]/60 hover:pl-5"
    }
    `}
  >
    <span className="[&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.5]">
      {item?.icon}
    </span>
    <span className="text-sm">{item?.name}</span>
  </li>
</Link>

  );
}
