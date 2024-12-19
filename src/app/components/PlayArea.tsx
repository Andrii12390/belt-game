import { Card } from "../types";
import { CardItem } from "./CardItem";

interface IPlayAreaProps {
  playAreaCards: Card[];
}

export const PlayArea = ({ playAreaCards }: IPlayAreaProps) => {
  const emptySlots =
    playAreaCards.length < 26
      ? Array(26 - playAreaCards.length).fill(null)
      : [];
  return (
    <div className="w-[80%] my-auto grid grid-cols-[repeat(13,_minmax(0,_1fr))] h-fit mx-auto gap-y-2">
      {playAreaCards.map((card, index) => (
        <CardItem key={index} path={card.path} />
      ))}
      {emptySlots.map((_, index) => (
        <CardItem key={playAreaCards.length + index} />
      ))}
    </div>
  );
};
