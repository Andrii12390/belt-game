'use client'

import { Card } from "../types";
import { Deck } from "./Deck"
import { PlayArea } from "./PlayArea"


interface IGameBoardProps {
  playAreaCards: Card[];
  deck: Card[];
  highlightedCards: Card[];
  onCardClick: (card: Card) => void;
}

export const GameBoard = ({ playAreaCards, deck, highlightedCards, onCardClick } : IGameBoardProps) => {

  return (
    <div className="flex flex-1 justify-between p-4">

      <PlayArea playAreaCards={playAreaCards} highlightedCards={highlightedCards} onCardClick={onCardClick} />
      <Deck deck={deck}  />
    </div>
  )
}
