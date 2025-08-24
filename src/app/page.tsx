"use client";

import { useAccount } from "wagmi";
import HomePage from "./components/HomePage";

export default function Home() {
  const {isConnected} = useAccount();

  return(
    <div>
      {isConnected ?(
        <HomePage />
      ):(
        <h1>
          Please connect your wallet 
        </h1>
      )}
    </div>
  )
}
