import Image from "next/image";
import { Card } from "../types";

interface PlayerHandProps {
  cards: Card[],
  handleMove?: (card: Card) => void;
  isMainPlayer?: boolean;
}

export const PlayerHand = ({ cards, handleMove, isMainPlayer }: PlayerHandProps) => {
  const hoverStyle = "hover:-translate-y-2 transition-transform duration-300";
  const maxCards = 4; 
  const emptySlots = Array(maxCards - cards.length).fill(null);

  return (
    <div className="flex justify-center items-center gap-x-4 py-2 min-h-[95px] md:mt-10 sm:mt-10 lg:mt-0">
      {cards.map((card, index) =>
        isMainPlayer ? (
          <div className={hoverStyle} key={card.path + card.value}
            onClick={() => handleMove && handleMove(card)}>
            <Image src={card.path} alt={card.path.slice(1, -4)} width={75} height={105} />
          </div>
        ) : (
          <Image src="/BACK.png" alt="/BACK.png" key={`/BACK.png${index}`} width={75} height={105} />
        )
      )}
      {emptySlots.map((_, index) => (
        <div key={`empty-${index}`} className="h-[105px] w-[75px]" />
      ))}
    </div>
  );
};
