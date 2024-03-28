import { FC, useState } from "react";
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

  const [index, setIndex] = useState<number>(10);

  const navigate = useNavigate();

  const twoLastQuote = langage === "fr" ? fr[index - 2] : en[index - 2];

  const lastQuote = langage === "fr" ? fr[index - 1] : en[index - 1];
  const quote = langage === "fr" ? fr[index] : en[index];
  const nextQuote = langage === "fr" ? fr[index + 1] : en[index + 1];

  const twoNextQuote = langage === "fr" ? fr[index + 2] : en[index + 2];

  const q = "''";

  return (
    <div className="h-screen w-screen p-5 font-serif flex flex-col">
      <div className="flex justify-between">
        <span className="text-4xl font-bold">wyse</span>
        <SelectLangage />
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-col max-w-5xl text-center text-4xl items-center justify-center mt-20">
          <FaChevronUp
            onClick={() => setIndex(index - 1)}
            className="mb-10 text-base cursor-pointer"
          />

          <div className="flex text-sm items-center text-neutral-900 justify-center">
            {q}
            {twoLastQuote}
            {q}
          </div>

          <div className="flex text-xl mt-3 items-center text-neutral-800 justify-center">
            {q}
            {lastQuote}
            {q}
          </div>

          <div className="flex items-center flex-col py-10">
            {q}
            {quote}
            {q}
            <div className="flex mt-4 gap-5">
              <FaShare className="text-neutral-800 text-base" />
              <FaCopy className="text-neutral-800 text-base" />
              <FaHeart className="text-red-800 text-base" />
            </div>
          </div>

          <div className="flex text-xl items-center text-neutral-800 justify-center">
            {q}
            {nextQuote}
            {q}
          </div>

          <div className="flex text-sm mt-3 items-center text-neutral-900 justify-center">
            {q}
            {twoNextQuote}
            {q}
          </div>

          <FaChevronDown
            onClick={() => setIndex(index + 1)}
            className="mt-10 text-base cursor-pointer"
          />

          <span className="my-5 text-sm text-neutral-600">
            {index + 1} / 50
          </span>
        </div>
      </div>
    </div>
  );
};
