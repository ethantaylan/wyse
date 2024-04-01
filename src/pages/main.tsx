import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import { AdviceItem, AdviceItemProps } from "../components/advice-item";
import { AdviceItemActions } from "../components/advice-item-actions";
import { Logo } from "../components/logo";
import { Pagination } from "../components/pagination";
import { advices as adv } from "../constants/advices";

export interface Quotes {
  twoLastQuote: string;
  lastQuote: string;
  quote: string;
  nextQuote: string;
  twoNextQuote: string;
}

const defaultQuotes: Quotes = {
  lastQuote: "",
  nextQuote: "",
  quote: "",
  twoLastQuote: "",
  twoNextQuote: "",
};

export const Main: FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isCopyAlertShowing, setIsCopyAlertShowing] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quotes>(defaultQuotes);

  const advices = useMemo(() => adv, []);

  const lastIndex = advices.length - 1;

  useEffect(() => {
    const calculateQuotes = () => {
      const getQuoteAtIndex = (i: number) => advices[i];
      setQuotes({
        lastQuote: getQuoteAtIndex(index === 0 ? lastIndex : index - 1),
        quote: getQuoteAtIndex(index),
        nextQuote: getQuoteAtIndex(index === lastIndex ? 0 : index + 1),
        twoLastQuote: getQuoteAtIndex(index === 0 ? lastIndex - 1 : index - 2),
        twoNextQuote: getQuoteAtIndex(index === lastIndex ? 1 : index + 2),
      });
    };
    calculateQuotes();
  }, [index, advices, lastIndex]);

  const handleMove = (delta: number) => {
    setIndex(
      (prevIndex) => (prevIndex + delta + advices.length) % advices.length,
    );
  };

  const { lastQuote, nextQuote, quote, twoLastQuote, twoNextQuote } = quotes;

  const AdvicesItemsArray: AdviceItemProps[] = [
    { quote: twoLastQuote, isSecondaryQuote: true },
    { quote: lastQuote, onClick: () => handleMove(-1) },
    {
      quote: quote,
      isMainQuote: true,
      children: (
        <AdviceItemActions quote={quote}  />
      ),
    },
    { quote: nextQuote, onClick: () => handleMove(1) },
    { quote: twoNextQuote, isSecondaryQuote: true },
  ];

  return (
    <div className="h-screen w-screen items-center justify-between p-5 font-serif flex flex-col">
      <Logo />

      <div className="flex px-5 flex-col max-w-5xl text-center text-2xl items-center justify-center">
        {AdvicesItemsArray.map((item) => (
          <AdviceItem key={item.index} {...item}>
            {item.children}
          </AdviceItem>
        ))}
      </div>

      <Pagination
        onLastQuote={() => handleMove(-1)}
        onNextQuote={() => handleMove(1)}
        onSetIndex={(e: ChangeEvent<HTMLInputElement>) =>
          setIndex(+e.target.value)
        }
        index={index}
      />
    </div>
  );
};
