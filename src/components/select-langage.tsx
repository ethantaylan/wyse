import clsx from "clsx";
import { FC } from "react";
import {
  LangageActionsType,
  useLangageDispatch,
  useLangageState,
} from "../context";

export const SelectLangage: FC = () => {
  const dispatch = useLangageDispatch();
  const { langage } = useLangageState();

  const handleLangageDispatch = (selectedLangage: string) => {
    dispatch({
      payload: selectedLangage,
      type: LangageActionsType.SET_LANGAGE,
    });
  };

  return (
    <div className="flex gap-5">
      {["en", "fr"].map((l: string) => (
        <button
          key={l}
          onClick={() => handleLangageDispatch(l)}
          className={clsx("hover:font-black", l === langage && "font-black")}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
