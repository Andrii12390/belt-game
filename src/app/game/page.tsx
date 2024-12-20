'use client'

import { PlayerHand } from "../components/PlayerHand";
import { GameBoard } from "../components/GameBoard";
import { deck as initialDeck } from "../data";
import { useGame } from "../hooks/useGame";
import { IconButton } from "@mui/material";
import { Drawer } from "../components/ui/Drawer";
import { ArrowLeft } from "lucide-react";
import { DrawerToggle } from "../components/ui/DrawerToggle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Game() {
  const {
    highlightedPlayAreaCards, deck, playerCards, enemyCards,
    playAreaCards,  score, message, handlePlayerMove,
    handleTakeCombination
  } = useGame(initialDeck);
  
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const redirectToHome = () => {
      router.push("/")
    }
  return (
    <div className="no-scrollbar h-full bg-green-700 flex flex-col p-2 relative">
      {message && (
        <div className="absolute flex items-center justify-center inset-0 text-8xl bg-black bg-opacity-50 font-bold text-yellow-500">
          {message}
        </div>
      )}
      <aside className="absolute top-3 left-3 font-bold text-2xl text-yellow-400">
        Score: {score[0]} | {score[1]}
      </aside>

      <DrawerToggle isOpen={drawerOpen} onClick={toggleDrawer} />
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <div className="h-full bg-green-800 flex items-center p-2 text-yellow-500">
          <IconButton onClick={redirectToHome}>
            <ArrowLeft className="text-yellow-500"/>
          </IconButton>
            <span className="font-semibold text-yellow-500 tracking-wide">To main menu</span>
        </div>
      </Drawer>
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
