'use client'

import { useState } from "react";
import { Card } from "../types";
import { Deck } from "./Deck"
import { PlayArea } from "./PlayArea"
import { Drawer } from "./ui/Drawer";
import { DrawerToggle } from "./ui/DrawerToggle";
import { ArrowLeft } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";

interface IGameBoardProps {
  playAreaCards: Card[];
  deck: Card[];
  trump: string;
  highlightedCards: Card[];
  onCardClick: (card: Card) => void;
}

export const GameBoard = ({ playAreaCards, deck, trump, highlightedCards, onCardClick } : IGameBoardProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    const redirectToHome = () => {
      router.push("/")
    }
  
  return (
    <div className="flex flex-1 justify-between p-4">
      <DrawerToggle isOpen={drawerOpen} onClick={toggleDrawer} />
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <div className="h-full bg-green-800 flex items-center p-2 text-yellow-500">
          <IconButton onClick={redirectToHome}>
            <ArrowLeft className="text-yellow-500"/>
          </IconButton>
            <span className="font-semibold text-yellow-500 tracking-wide">To main menu</span>
        </div>
      </Drawer>
      <PlayArea playAreaCards={playAreaCards} highlightedCards={highlightedCards} onCardClick={onCardClick} />
      <Deck deck={deck}  />
    </div>
  )
}
