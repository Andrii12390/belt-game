'use client'

import { PlayerHand } from "./components/PlayerHand";
import { GameBoard } from "./components/GameBoard";
import { deck as initialDeck } from "./data";
import { useEffect, useState } from "react";
import { getRandomCards } from "./utils/getRandomCards";
import { Card } from "./types";

export default function Home() {
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [enemyCards, setEnemyCards] = useState<Card[]>([]);
  const [playAreaCards, setPlayAreaCards] = useState<Card[]>([]);

  const dealCards = () => {
    const [plCards, newDeckAfterPlayer] = getRandomCards({ deck, num: 4 });
    setPlayerCards(plCards);

    const [enCards, newDeckAfterEnemy] = getRandomCards({ deck: newDeckAfterPlayer, num: 4 });
    setEnemyCards(enCards);
    setDeck(newDeckAfterEnemy);
  };

  useEffect(() => {
    dealCards();
  }, []);

  const handlePlayerMove = (card: Card) => {
    if(!isPlayerTurn) {
      return;
    }
    const updatedPlayAreaCards = [...playAreaCards, card];
    const updatedPlayerCards = playerCards.filter((card_) => card_.path !== card.path);
    let updatedDeck = [...deck];
    let newPlayerCard: Card | null = null;

    if (updatedDeck.length > 1) {
      newPlayerCard = updatedDeck[updatedDeck.length - 2];
      updatedDeck = [...updatedDeck.slice(0, -2), updatedDeck.at(-1)!];
    } else if (updatedDeck.length === 1) {
      newPlayerCard = updatedDeck[0];
      updatedDeck = [];
    }

    if (newPlayerCard) {
      updatedPlayerCards.push(newPlayerCard);
    }

    setPlayAreaCards(updatedPlayAreaCards);
    setPlayerCards(updatedPlayerCards);
    setDeck(updatedDeck);

    setIsPlayerTurn(false);
    setTimeout(() => {
      handleEnemyMove(updatedPlayAreaCards, updatedDeck);
      setIsPlayerTurn(true);
    }, 1000);
  };

  const handleEnemyMove = (updatedPlayAreaCards: Card[], updatedDeck: Card[]) => {
    if (enemyCards.length === 0) {
      console.log("No cards left for the enemy to play");
      return;
    }

    const randomIndex = Math.floor(Math.random() * enemyCards.length);
    const randomCard = enemyCards[randomIndex];
    updatedPlayAreaCards = [...updatedPlayAreaCards, randomCard];

    const updatedEnemyCards = enemyCards.filter((_, index) => index !== randomIndex);
    let newEnemyCard: Card | null = null;

    if (updatedDeck.length > 1) {
      newEnemyCard = updatedDeck[updatedDeck.length - 2];
      updatedDeck = [...updatedDeck.slice(0, -2), updatedDeck.at(-1)!];
    } else if (updatedDeck.length === 1) {
      newEnemyCard = updatedDeck[0];
      updatedDeck = [];
    }

    if (newEnemyCard) {
      updatedEnemyCards.push(newEnemyCard);
    }

    setPlayAreaCards(updatedPlayAreaCards);
    setEnemyCards(updatedEnemyCards);
    setDeck(updatedDeck);
  };

  return (
    <div className="h-full bg-green-700 flex flex-col">
      <PlayerHand cards={enemyCards} />
      <GameBoard playAreaCards={playAreaCards} trump="H" deck={deck} />
      <PlayerHand cards={playerCards} handleMove={handlePlayerMove} isMainPlayer />
    </div>
  );
}
