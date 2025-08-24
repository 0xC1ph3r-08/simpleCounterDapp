import { useState, useEffect } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../constants";
import { useWriteContract, useConfig } from "wagmi";
import { waitForTransactionReceipt, readContract } from "@wagmi/core";

export default function HomePage() {
  const [number, setNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState(0);
  const { writeContractAsync } = useWriteContract();
  const config = useConfig();

  // 🔹 Fetch current value on mount
  useEffect(() => {
    async function fetchNumber() {
      const current = await readContract(config, {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "number", // public getter
      });
      setNumber(Number(current));
    }
    fetchNumber();
  }, [config]);

  // 🔹 Increment button
  async function increment() {
    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "increment",
    });

    await waitForTransactionReceipt(config, { hash });

    // re-fetch latest contract value
    const updated = await readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "number",
    });
    setNumber(Number(updated));
  }

  // 🔹 Set Number button
  async function setNewNumber() {
    const hash = await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "setNumber",
      args: [inputNumber], // 👈 use inputNumber, not local number
    });

    await waitForTransactionReceipt(config, { hash });

    // re-fetch latest contract value
    const updated = await readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "number",
    });
    setNumber(Number(updated));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Counter DApp Frontend</h1>

      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center gap-6 text-black">
        <p className="text-3xl font-semibold">Current Number: {number}</p>

        <button
          onClick={increment}
          className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
        >
          Increment
        </button>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            className="border rounded px-3 py-1 w-24 text-black"
            placeholder="Enter number"
          />
          <button
            onClick={setNewNumber}
            className="px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          >
            Set Number
          </button>
        </div>
      </div>
    </div>
  );
}
