import { Card } from "../types";
import { CardItem } from "./CardItem";


interface IPlayAreaProps {
  playAreaCards: Card[];
  highlightedCards: Card[]; 
  onCardClick: (card: Card) => void;
}

export const PlayArea = ({ playAreaCards, highlightedCards, onCardClick }: IPlayAreaProps) => {
  const emptySlots =
    playAreaCards.length < 52
      ? Array(52 - playAreaCards.length).fill(null)
      : [];

  return (
    <div className="w-[80%] my-auto grid lg:grid-cols-[repeat(13,_minmax(0,_1fr))] h-fit mx-auto gap-y-4">
      {playAreaCards.map((card, index) => {
        const isHighlighted = highlightedCards.some(
          (highlightedCard) => highlightedCard.path === card.path
        );

        return (
          <CardItem
            key={index}
            card={card}
            onCardClick={onCardClick}
            isHighlighted={isHighlighted} 
          />
        );
      })}
      {emptySlots.map((_, index) => (
        <CardItem key={playAreaCards.length + index} />
      ))}
    </div>
  );
};
