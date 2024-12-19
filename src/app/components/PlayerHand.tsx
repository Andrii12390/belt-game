import Image from "next/image";
import { Card } from "../types";

interface PlayerHandProps {
  cards: Card[],
  handleMove?: (card: Card) => void;
  isMainPlayer?: boolean;
}

export const PlayerHand = ({ cards, handleMove, isMainPlayer }: PlayerHandProps) => {
  const hoverStyle = "hover:-translate-y-2 transition-transform duration-300";
  return (
    <div className="flex justify-center items-center gap-4 py-2">
      {cards.map((card, index) =>
        isMainPlayer ? (
          <div className={hoverStyle} key={card.path + card.value}
            onClick={() => handleMove && handleMove(card)}>
            <Image src={card.path} alt={card.path.slice(1, -4)} width={65} height={95} />
          </div>
        ) : (
          <Image src="/BACK.png" alt="/BACK.png" key={`/BACK.png${index}`} width={65} height={95} />
        )
      )}
    </div>
  );
};
