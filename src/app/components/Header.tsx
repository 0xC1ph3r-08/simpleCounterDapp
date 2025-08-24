"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">My DApp</h1>
      <div className="flex items-center gap-2">
        <ConnectButton  />
      </div>
    </header>
  );
};
