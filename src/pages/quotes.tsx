import { animated, useSpring } from "@react-spring/web";
import { FC, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCopy,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { SelectLangage } from "../components/select-langage";
import { en } from "../constants/advices/en";
import { fr } from "../constants/advices/fr";
import { useLangageState } from "../context";
import { useNavigate } from "react-router-dom";

export const Quotes: FC = () => {
  const { langage } = useLangageState();

  const [index, setIndex] = useState<number>(0);

  const quote = langage === "fr" ? fr[index] : en[index];

  const navigate = useNavigate()

  const springs = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className="h-screen w-screen p-5 font-serif flex flex-col">
      <div className="flex my-4 justify-between">
        <span onClick={() => navigate('/')} className="font-bold cursor-pointer text-2xl">wyse</span>
        <SelectLangage />
      </div>

      <div className="flex relative flex-col bg-slate-50 p-10">
        <animated.div
          style={{ ...springs }}
          className="text-3xl min-h-20 italic"
        >
          {"''"}
          {quote}
          {"''"}
        </animated.div>

        <div className="flex mt-10 gap-10 justify-center items-center">
          <button className="text-slate-400 hover:text-slate-600">
            <FaCopy />
          </button>

          <button className="text-slate-400 hover:text-slate-600">
            <FaShare />
          </button>

          <button className="text-red-400 hover:text-red-600">
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="join flex justify-center items-center gap-10 mt-10">
        <button
          className="btn bg-slate-100"
          onClick={() => setIndex(index - 1)}
        >
          <FaAngleLeft />
        </button>
        <span className="p-3 px-5 font-bold bg-slate-100">
          {index + 1} / 50
        </span>

        <button
          className="btn bg-slate-100"
          onClick={() => setIndex(index + 1)}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};
