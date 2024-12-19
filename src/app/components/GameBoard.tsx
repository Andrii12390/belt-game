import { Card } from "../types";
import { Deck } from "./Deck"
import { PlayArea } from "./PlayArea"

interface IGameBoardProps {
  playAreaCards: Card[];
  deck: Card[];
  trump: string;
}

export const GameBoard = ({ playAreaCards, deck, trump } : IGameBoardProps) => {
  return (
    <div className="flex flex-1 justify-between p-4">
      <PlayArea playAreaCards={playAreaCards} />
      <Deck deck={deck}  />
    </div>
  )
}
