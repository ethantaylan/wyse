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
      {["en", "fr", "tr"].map((l: string) => (
        <button
          key={l}
          onClick={() => handleLangageDispatch(l)}
          className={clsx(
            "hover:font-bold hover:text-white text-sm font-sans text-neutral-400",
            l === langage && "font-black text-white",
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
