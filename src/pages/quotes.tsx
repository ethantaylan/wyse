import { FC, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaCopy,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SelectLangage } from "../components/select-langage";
import { en } from "../constants/advices/en";
import { fr } from "../constants/advices/fr";
import { useLangageState } from "../context";

export const Quotes: FC = () => {
  const { langage } = useLangageState();
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  const quotes = langage === "fr" ? fr : en;
  const lastIndex = quotes.length - 1;

  const getQuoteAtIndex = (i: number) => {
    if (i < 0) return "";
    if (i > lastIndex) return "";
    return quotes[i];
  };

  const q = "''";
  const [accumulatedDelta, setAccumulatedDelta] = useState<number>(0);
  const scrollThreshold = 50; // Adjust this value as needed

  useEffect(() => {
    console.log(index);
  }, [index]);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY;
    setAccumulatedDelta((prevDelta) => prevDelta + delta);
    if (Math.abs(accumulatedDelta) >= scrollThreshold) {
      const scrollIncrement = Math.floor(Math.abs(accumulatedDelta) / scrollThreshold);
      if (delta > 0) {
        setIndex((prevIndex) => (prevIndex === lastIndex ? 0 : prevIndex + scrollIncrement));
      } else {
        setIndex((prevIndex) => (prevIndex === 0 ? lastIndex : prevIndex - scrollIncrement));
      }
      setAccumulatedDelta(0);
    }
  };

  return (
    <div className="h-screen w-screen p-5 font-serif flex flex-col" onWheel={handleScroll}>
      <div className="flex justify-between">
        <span
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer"
        >
          wyse
        </span>
        <SelectLangage />
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col max-w-5xl text-center text-2xl items-center justify-center mt-20">
          <button
            onClick={() => setIndex(index === 0 ? 49 : index - 1)}
            className="mb-10 btn btn-sm btn-ghost"
          >
            <FaChevronUp className="text-neutral-500 text-base cursor-pointer" />
          </button>

          <div className="flex text-sm items-center text-neutral-900 justify-center">
            {q}
            {index === 0 ? getQuoteAtIndex(48) : getQuoteAtIndex(index - 2)}
            {q}
          </div>

          <div className="flex text-base mt-3 items-center text-neutral-800 justify-center">
            {q}
            {index === 0 ? getQuoteAtIndex(49) : getQuoteAtIndex(index - 1)}
            {q}
          </div>

          <div className="flex items-center min-h-44 flex-col pt-10">
            {q}
            {getQuoteAtIndex(index)}
            {q}
            <div className="flex mt-4 gap-10">
              <FaShare className="text-neutral-800 hover:text-white cursor-pointer text-base" />
              <FaCopy className="text-neutral-800 hover:text-white cursor-pointer text-base" />
              <FaHeart className="text-red-950 hover:text-red-600 cursor-pointer text-base" />
            </div>
          </div>

          <div className="flex text-base items-center text-neutral-800 justify-center">
            {q}
            {index === lastIndex
              ? getQuoteAtIndex(0)
              : getQuoteAtIndex(index + 1)}
            {q}
          </div>

          <div className="flex text-sm mt-3 items-center text-neutral-900 justify-center">
            {q}
            {index === lastIndex
              ? getQuoteAtIndex(1)
              : getQuoteAtIndex(index + 2)}
            {q}
          </div>

          <button
            onClick={() => setIndex(index === lastIndex ? 0 : index + 1)}
            className="mt-10 btn btn-sm btn-ghost"
          >
            <FaChevronDown className="text-neutral-500 text-base cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <span
          onClick={() => setIndex(0)}
          className="my-5 btn text-sm text-neutral-600"
        >
          1
        </span>

        <span className="my-5 text-sm text-neutral-600">{index + 1} / 50</span>

        <span
          onClick={() => setIndex(lastIndex)}
          className="my-5 btn text-sm text-neutral-600"
        >
          50
        </span>
      </div>
    </div>
  );
};
