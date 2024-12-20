import Image from "next/image";
import { Card } from "../types";

interface DeckProps {
  deck: Card[];
}

export const Deck = ({ deck }: DeckProps) => {
  const cardsLeft = (deck.length - 1).toString().padStart(2, '0')
  return (
    <div className="w-[20%] flex justify-center items-center gap-2">
      <div className="relative">
        {deck.length - 1 > 0 ? (
          <>
            <Image src="/BACK.png" alt="trump" height={105} width={75} />
            <div className="absolute -top-7 inset-x-6 font-bold text-xl text-yellow-500">
              {cardsLeft}
            </div>
          </>
        ) : (
          <div className="flex h-[105px] w-[75px] border-2 border-yellow-500 border-dashed rounded-md text-yellow-400 font-bold justify-center items-center">
            0
          </div>
        )}
      </div>
      {deck.length >= 1 ? (
        <Image
          src={deck.at(-1)?.path || ""}
          alt="trump"
          height={105}
          width={75}
        />
      ) : (
        <div className="h-[95px] w-[65px]"></div>
      )}
    </div>
  );
};
