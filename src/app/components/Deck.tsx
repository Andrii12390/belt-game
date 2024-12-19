import Image from "next/image";
import { Card } from "../types";

interface DeckProps {
  deck: Card[];
}

export const Deck = ({ deck }: DeckProps) => {
  return (
    <div className="w-[20%] flex justify-center items-center gap-2">
      <div className="relative">
        {deck.length - 1 > 0 ? (
          <>
            <Image src="/BACK.png" alt="trump" height={95} width={65} />
            <div className="absolute -top-6 left-5 font-extrabold text-yellow-600">
              {deck.length - 1}
            </div>
          </>
        )
          :(
            <div className="flex h-[95px] w-[65px] border-2 border-yellow-600 border-dashed rounded-md text-yellow-600 font-bold justify-center items-center">
              0
            </div>
          )
        }
      </div>
      {deck.length >= 1 ? (
        <Image src={deck.at(-1)?.path || ''} alt="trump" height={95} width={65} />
      ) : (
        <div className="h-[95px] w-[65px]"></div>
      )
    }
    </div>
  )
}
