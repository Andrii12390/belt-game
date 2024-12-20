"use client";

import { Play } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const redirectToGame = () => {
    router.push("/game");
  };

  return (
    <div className="bg-green-700 h-full flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl  font-extrabold text-yellow-500 mb-8">
          Welcome to Belt Game!
        </h1>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-yellow-500 text-green-700 text-xl  py-2 px-6 rounded-full shadow-md hover:bg-yellow-600 transition duration-300 font-semibold"
            onClick={redirectToGame}
          >
            <div className="flex gap-3">
              <Play />
              <span>Play</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
