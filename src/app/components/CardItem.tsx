import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "../types";

interface CardItemProps {
  isHighlighted?: boolean;
  card?: Card;
  onCardClick?: (card: Card) => void;
}

export const CardItem = ({ card, isHighlighted, onCardClick }: CardItemProps) => {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    if (isHighlighted) {
      setStartAnimation(true);
    } else {
      setStartAnimation(false);
    }
  }, [isHighlighted]);

  return (
    <div className="flex items-center justify-center">
      {card?.path ? (
        <div
          className={`${
            isHighlighted && startAnimation ? "highlight-effect" : ""
          }`}
          onClick={() => onCardClick?.(card)} 
        >
          <Image src={card.path} height={95} width={65} alt="card" />
        </div>
      ) : (
        <div className="flex h-[95px] w-[65px] border-2 border-yellow-500 border-dashed rounded-md text-yellow-500 font-bold justify-center items-center">
          Card
        </div>
      )}
    </div>
  );
};

