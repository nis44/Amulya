"use client";

import { useUsers } from "@/lib/firestore/user/read";
import { Avatar, Button, CircularProgress } from "@nextui-org/react";
import { Download } from "lucide-react";

export default function ListView() {
  const { data: users, error, isLoading } = useUsers();

  const handleExport = () => {
    const csvContent = [
      ['Customer ID', 'Name', 'Email'],
      ...users.map(user => [
        user.uid,
        `"${user.displayName || 'Guest User'}"`,
        `"${user.email}"`
      ])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'customers.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <CircularProgress 
          classNames={{
            svg: "w-16 h-16",
            track: "stroke-[#EBD1C4]",
            indicator: "stroke-[#5E121D]"
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F9F6F4] p-6 rounded-xl text-center text-[#5E121D] font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6 bg-white rounded-xl shadow-sm border border-[#EBD1C4] p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-bold text-[#5E121D]">
          Customer Accounts
        </h1>
        <Button 
          onClick={handleExport}
          className="bg-[#5E121D] text-white hover:bg-[#8A1A2B]"
          startContent={<Download size={16} />}
        >
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {users?.map((item) => (
          <UserCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ item }) {
  return (
    <div className="flex items-center gap-3 bg-[#F9F6F4] rounded-lg p-3 hover:shadow-sm transition-all border border-[#EBD1C4]">
      <Avatar 
        src={item?.photoURL} 
        className="w-10 h-10 border-2 border-[#EBD1C4]"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-[#5E121D] truncate">
          {item?.displayName || 'Guest User'}
        </h3>
        <p className="text-xs text-[#8A1A2B] truncate">{item?.email}</p>
      </div>
    </div>
  );
}
