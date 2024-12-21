import { useState, useEffect, useCallback } from "react";
import { getRandomCards } from "../utils/getRandomCards";
import { Card } from "../types";

export function useGame(initialDeck: Card[]) {
  const [highlightedPlayAreaCards, setHighlightedPlayAreaCards] = useState<Card[]>([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [deck, setDeck] = useState<Card[]>(initialDeck);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [enemyCards, setEnemyCards] = useState<Card[]>([]);
  const [playAreaCards, setPlayAreaCards] = useState<Card[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [score, setScore] = useState([0, 0]);
  const [message, setMessage] = useState("");

  const getHighlightedPlayAreaCards = useCallback((): Card[] => {
    if (playAreaCards.length < 3) {
      return [];
    }

    const playAreaGroups = playAreaCards.reduce<Record<number, Card[]>>(
      (groups, card) => {
        if (!groups[card.value]) {
          groups[card.value] = [];
        }
        groups[card.value].push(card);
        return groups;
      }, {}
    );

    const eligiblePlayAreaGroups = Object.entries(playAreaGroups).filter(
      ([, group]) => group.length >= 3
    );

    if (!eligiblePlayAreaGroups.length) return [];

    const highlightedCards: Card[] = [];
    eligiblePlayAreaGroups.forEach(([valueStr, cards]) => {
      const value = parseInt(valueStr, 10);

      const playerGroups = playerCards.reduce<Record<number, Card[]>>(
        (groups, card) => {
          if (!groups[card.value]) {
            groups[card.value] = [];
          }
          groups[card.value].push(card);
          return groups;
        }, {}
      );

      Object.entries(playerGroups).forEach(([playerValueStr, playerGroup]) => {
        const playerValue = parseInt(playerValueStr, 10);
        if (playerValue > value && playerGroup.length >= 3) {
          highlightedCards.push(...cards); 
        }
      });
    });
    return highlightedCards;
  }, [playAreaCards, playerCards]);

  useEffect(() => {
    setHighlightedPlayAreaCards(getHighlightedPlayAreaCards());
  }, [playAreaCards, playerCards, getHighlightedPlayAreaCards]);

  const dealCards = useCallback(() => {
    const [plCards, newDeckAfterPlayer] = getRandomCards({ deck: initialDeck, num: 4 });
    setPlayerCards(plCards);
    const [enCards, newDeckAfterEnemy] = getRandomCards({
      deck: newDeckAfterPlayer,
      num: 4,
    });
    setEnemyCards(enCards);
    setDeck(newDeckAfterEnemy);
  }, [initialDeck]);

  useEffect(() => {
    if ((enemyCards.length === 0 || playerCards.length === 0) && playAreaCards.length) {
      const newMessage = playerScore > enemyScore ? "You won!" : playerScore === enemyScore ? "Draw!" : "Ha-ha-ha you lose!";
      setMessage(newMessage);

      const timer = setTimeout(() => {
        dealCards();
        setPlayAreaCards([]);
        if (playerScore > enemyScore) {
          setScore((prev) => [prev[0] + 1, prev[1]]);
        } else if (enemyScore > playerScore) {
          setScore((prev) => [prev[0], prev[1] + 1]);
        }
        setMessage("");
        setPlayerScore(0);
        setEnemyScore(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [enemyCards, playerCards, playAreaCards.length, playerScore, enemyScore, dealCards]);

  useEffect(() => {
    dealCards();
  }, [dealCards]);

  const handlePlayerMove = (card: Card) => {
    if (!isPlayerTurn) return;

    const updatedPlayAreaCards = [...playAreaCards, card];
    const updatedPlayerCards = playerCards.filter(
      (card_) => card_.path !== card.path
    );

    let updatedDeck = [...deck];
    let newPlayerCard: Card | null = null;

    if (updatedDeck.length > 1) {
      newPlayerCard = updatedDeck[updatedDeck.length - 2];
      updatedDeck = [...updatedDeck.slice(0, -2), updatedDeck.at(-1)!];
    } else if (updatedDeck.length === 1) {
      newPlayerCard = updatedDeck[0];
      updatedDeck = [];
    }

    if (newPlayerCard) updatedPlayerCards.push(newPlayerCard);
    

    setPlayAreaCards(updatedPlayAreaCards);
    setPlayerCards(updatedPlayerCards);
    setDeck(updatedDeck);

    setIsPlayerTurn(false);
    setTimeout(() => {
      handleEnemyMove(updatedPlayAreaCards, updatedDeck);
      setIsPlayerTurn(true);
    }, 100);
  };

  const handleTakeCombination = (clickedCard: Card) => {
    if (!highlightedPlayAreaCards.includes(clickedCard)) return;

    const takenCards = highlightedPlayAreaCards.filter((card) => card.value === clickedCard.value);
    const updatedPlayAreaCards = playAreaCards.filter((card) => !takenCards.includes(card));

    const usedPlayerCards = playerCards.filter((card) => card.value > clickedCard.value).slice(0, 3);
    const updatedPlayerCards = playerCards.filter((card) => !usedPlayerCards.includes(card));

    const updatedDeck = [...deck];
    const newPlayerCards: Card[] = [];
    while (newPlayerCards.length < 3 && updatedDeck.length > 0) {
      newPlayerCards.push(updatedDeck.pop()!);
    }
    const finalPlayerCards = [...updatedPlayerCards, ...newPlayerCards];

    setPlayAreaCards(updatedPlayAreaCards);
    setPlayerCards(finalPlayerCards);
    setDeck(updatedDeck);
    setPlayerScore((prev) => prev + 1);
  };

  const checkAndHandleBotCombination = useCallback(() => {
    if (!playAreaCards || !enemyCards || !deck) return;

    const playAreaGroups = playAreaCards.reduce<Record<number, Card[]>>(
      (groups, card) => {
        if (!groups[card.value]) groups[card.value] = [];
        groups[card.value].push(card);
        return groups;
      },
      {}
    );

    const enemyGroups = enemyCards.reduce<Record<number, Card[]>>((groups, card) => {
      if (!groups[card.value]) groups[card.value] = [];
      groups[card.value].push(card);
      return groups;
    }, {});

    let foundCombination = false;

    Object.entries(playAreaGroups).forEach(([valueStr, playAreaCombination]) => {
      if (foundCombination) return;

      const playAreaValue = parseInt(valueStr, 10);
      if (!playAreaCombination || playAreaCombination.length < 3) return;

      const higherRankCards = Object.entries(enemyGroups)
        .filter(
          ([enemyValueStr, enemyCards]) =>
            parseInt(enemyValueStr, 10) > playAreaValue && 
            enemyCards.length >= playAreaCombination.length &&
            enemyCards.every((card) => card.value === enemyCards[0].value)
        )
        .map(([, enemyCards]) => enemyCards.slice(0, playAreaCombination.length))
        .flat();

      if (higherRankCards.length === playAreaCombination.length) {
        foundCombination = true;

        setPlayAreaCards((prev) =>
          prev.filter((card) => !playAreaCombination.includes(card))
        );

        setEnemyCards((prev) =>
          prev.filter((card) => !higherRankCards.includes(card))
        );

        const updatedDeck = [...deck];
        const newEnemyCards: Card[] = [];
        for (let i = 0; i < higherRankCards.length; i++) {
          if (updatedDeck.length > 0) {
            newEnemyCards.push(updatedDeck.pop()!);
          }
        }
        setEnemyScore((score) => score + 1);
        setEnemyCards((prev) => [...prev, ...newEnemyCards]);
        setDeck(updatedDeck);
      }
    });
  }, [playAreaCards, enemyCards, deck]);

  useEffect(() => {
    const botMoveInterval = setInterval(() => {
      checkAndHandleBotCombination();
    }, 5000);
  
    return () => clearInterval(botMoveInterval); 
  }, [playAreaCards, enemyCards, deck, checkAndHandleBotCombination]);

  const handleEnemyMove = (updatedPlayAreaCards: Card[], updatedDeck: Card[]) => {
    if (enemyCards.length === 0) return;
  
    const cardGroups = enemyCards.reduce<Record<number, Card[]>>((groups, card) => {
      if (!groups[card.value]) groups[card.value] = [];
      groups[card.value].push(card);
      return groups;
    }, {});
  
    const worstCard = Object.entries(cardGroups)
      .sort((a, b) => {
        if (a[1].length !== b[1].length) return a[1].length - b[1].length;
  
        return parseInt(a[0], 10) - parseInt(b[0], 10);
      })
      .map(([, cards]) => cards[0])[0]; 
  
    updatedPlayAreaCards = [...updatedPlayAreaCards, worstCard];
    const updatedEnemyCards = enemyCards.filter((card) => card !== worstCard);
  
    if (updatedDeck.length > 1) {
      updatedEnemyCards.push(updatedDeck[updatedDeck.length - 2]);
      updatedDeck = [...updatedDeck.slice(0, -2), updatedDeck.at(-1)!];
    } else if (updatedDeck.length === 1) {
      updatedEnemyCards.push(updatedDeck.pop()!);
    }
  
    setPlayAreaCards(updatedPlayAreaCards);
    setEnemyCards(updatedEnemyCards);
    setDeck(updatedDeck);
  };

  return {
    highlightedPlayAreaCards, isPlayerTurn, deck, playerCards, enemyCards,
    playAreaCards, playerScore, enemyScore, score, message, setIsPlayerTurn,
    setPlayAreaCards, setPlayerCards, setEnemyCards, setDeck, setPlayerScore,
    setEnemyScore, handlePlayerMove, handleTakeCombination, handleEnemyMove,
    checkAndHandleBotCombination
  };
}
