'use client'

import { PlayerHand } from "../components/PlayerHand";
import { GameBoard } from "../components/GameBoard";
import { deck as initialDeck } from "../data";
import { useGame } from "../hooks/useGame";

export default function Game() {
  const {
    highlightedPlayAreaCards, deck, playerCards, enemyCards,
    playAreaCards,  score, message, handlePlayerMove,
    handleTakeCombination
  } = useGame(initialDeck);

  return (
    <div className="h-full bg-green-700 flex flex-col p-2 relative">
      {message && (
        <div className="absolute flex items-center justify-center inset-0 text-8xl bg-black bg-opacity-50 font-bold text-yellow-500">
          {message}
        </div>
      )}
      <aside className="absolute top-3 left-3 font-bold text-2xl text-yellow-400">
        Score: {score[0]} | {score[1]}
      </aside>

      <PlayerHand cards={enemyCards} isMainPlayer={false} />
      
      <GameBoard
        playAreaCards={playAreaCards}
        highlightedCards={highlightedPlayAreaCards}
        deck={deck}
        onCardClick={handleTakeCombination} 
      />
      <PlayerHand
        cards={playerCards}
        handleMove={handlePlayerMove}
        isMainPlayer
      />
    </div>
  );
}
