import { Card } from "../types";

interface IGetRandomCards {
  deck: Card[];
  num: number;
}

export const getRandomCards = ({ deck, num }: IGetRandomCards): [Card[], Card[]] => {
  const shuffledDeck = [...deck].sort(() => 0.5 - Math.random());

  const selectedCards = shuffledDeck.slice(0, num);

  const remainingDeck = shuffledDeck.slice(num);
  
  return [selectedCards, remainingDeck];
};
