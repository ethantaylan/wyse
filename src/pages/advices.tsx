import { useLocalStorage } from "@uidotdev/usehooks";
import clsx from "clsx";
import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCopy,
  FaHeart,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { WhatsappShareButton } from "react-share";
import { SelectLangage } from "../components/select-langage";
import { en } from "../constants/advices/en";
import { fr } from "../constants/advices/fr";
import { tr } from "../constants/advices/tr";
import { useLangageState } from "../context";

export const Advices: FC = () => {
  const { langage } = useLangageState();
  const [index, setIndex] = useState<number>(0);
  const [isCopyAlertShowing, setIsCopyAlertShowing] = useState<boolean>(false);

  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLocalStorage, setFavoritesLocalStorage] = useLocalStorage(
    "favorites",
    favorites,
  );

  const [isShowfavoritesLocalStorage, setIsShowfavoritesLocalStorage] =
    useState<boolean>(false);

  const handleAdvices = () => {
    switch (langage) {
      case "fr":
        return fr;
      case "en":
        return en;
      case "tr":
        return tr;
      default:
        return en;
        break;
    }
  };

  const advices = handleAdvices();

  const lastIndex = isShowfavoritesLocalStorage
    ? favoritesLocalStorage.length - 1
    : advices.length - 1;

  const q = "''";
  const [accumulatedDelta, setAccumulatedDelta] = useState<number>(0);
  const scrollThreshold = 50;

  const getQuoteAtIndex = (i: number) => {
    return isShowfavoritesLocalStorage ? favoritesLocalStorage[i] : advices[i];
  };

  const navigate = useNavigate();

  const isFavorite = favoritesLocalStorage.some(
    (advice) => advice === getQuoteAtIndex(index),
  );

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(getQuoteAtIndex(index));
    setIsCopyAlertShowing(true);
  };

  useEffect(() => {
    isCopyAlertShowing &&
      setTimeout(() => {
        setIsCopyAlertShowing(false);
      }, 1000);
  }, [isCopyAlertShowing]);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const delta = event.deltaY;
    setAccumulatedDelta((prevDelta) => prevDelta + delta);
    if (Math.abs(accumulatedDelta) >= scrollThreshold) {
      const scrollIncrement = Math.floor(
        Math.abs(accumulatedDelta) / scrollThreshold,
      );
      if (delta > 0) {
        setIndex((prevIndex) =>
          prevIndex === lastIndex ? 0 : prevIndex + scrollIncrement,
        );
      } else {
        setIndex((prevIndex) =>
          prevIndex === 0 ? lastIndex : prevIndex - scrollIncrement,
        );
      }
      setAccumulatedDelta(0);
    }
  };

  useEffect(() => {
    setFavoritesLocalStorage(favorites);
  }, [favorites]);

  const handleAddToFavorites = (advice: string) => {
    if (favorites.includes(advice)) {
      const updatedFavorites = favoritesLocalStorage.filter(
        (q) => q !== advice,
      );
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, advice]);
    }
  };

  return (
    <div
      className="h-screen w-screen p-5 font-serif flex flex-col"
      onWheel={handleScroll}
    >
      <div className="flex items-center justify-between">
        <div>
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            wyse
          </span>

          <h2 className="text-base text-neutral-600">
            {langage === "fr"
              ? "50 Points de Conseils d'un Homme de 80 Ans"
              : "50 Points Of Advice From An 80-Year-Old Man"}
          </h2>
        </div>

        <div className="flex">
          <div className="flex me-5 items-center">
            <span
              onClick={() =>
                setIsShowfavoritesLocalStorage(!isShowfavoritesLocalStorage)
              }
              className={clsx(
                "text-sm btn btn-sm text-primary font-sans",
                isShowfavoritesLocalStorage ? "text-white" : "text-primary",
              )}
            >
              Favorite Advices
              <FaHeart
                className={clsx(
                  "text-sm ms-2",
                  isShowfavoritesLocalStorage ? "text-red-600" : "text-red-950",
                )}
              />
            </span>
          </div>

          <SelectLangage />
        </div>
      </div>
      {isShowfavoritesLocalStorage ? (
        <div className="flex h-full flex-col items-center mt-20">
          <div className="flex items-center mb-10">
            <h1 className="text-2xl text-primary">Favorite Advices</h1>
          </div>
          <div className="flex flex-col gap-3">
            {favoritesLocalStorage.length > 0
              ? favorites.map((advice) => (
                  <h1
                    key={advice}
                    className="text-2xl justify-center flex items-center"
                  >
                    {q}
                    {advice}
                    {q}

                    {/* <FaHeartBroken
                      className={clsx(
                        "hover:text-red-600 ms-2 cursor-pointer text-base",
                        isFavorite ? "text-red-600" : "text-red-950",
                      )}
                    /> */}
                  </h1>
                ))
              : "No favorite Advice"}
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-full items-center justify-center">
            <div className="flex px-5 flex-col max-w-5xl text-center text-2xl items-center justify-center">
              <div className="flex text-sm items-center text-neutral-900 justify-center">
                {q}
                {index === 0 ? getQuoteAtIndex(48) : getQuoteAtIndex(index - 2)}
                {q}
              </div>

              <div
                onClick={() => setIndex(index === 0 ? 49 : index - 1)}
                className="flex text-base mt-3 cursor-pointer items-center text-neutral-800 justify-center"
              >
                {q}
                {index === 0 ? getQuoteAtIndex(49) : getQuoteAtIndex(index - 1)}
                {q}
              </div>

              <div className="flex items-center flex-col py-10">
                {q}
                {getQuoteAtIndex(index)}
                {q}
                <div className="flex mt-4 gap-10">
                  <WhatsappShareButton
                    url={`"${getQuoteAtIndex(index)}" - from ${
                      langage === "fr"
                        ? "50 Points de Conseils d'un Homme de 80 Ans"
                        : "50 Points Of Advice From An 80-Year-Old Man"
                    }`}
                  >
                    <FaWhatsapp className="text-neutral-800 hover:text-white cursor-pointer text-xl" />
                  </WhatsappShareButton>
                  <FaCopy
                    onClick={handleCopyQuote}
                    className="text-neutral-800 hover:text-white cursor-pointer text-base"
                  />

                  <FaHeart
                    onClick={() => handleAddToFavorites(getQuoteAtIndex(index))}
                    className={clsx(
                      "hover:text-red-600 cursor-pointer text-base",
                      isFavorite ? "text-red-600" : "text-red-950",
                    )}
                  />
                </div>

                {isCopyAlertShowing && (
                  <span className="text-primary font-sans text-xs">
                    Copied !
                  </span>
                )}
              </div>

              <div
                onClick={() => setIndex(index === lastIndex ? 0 : index + 1)}
                className="flex cursor-pointer text-base items-center text-neutral-800 justify-center"
              >
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
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <span
              onClick={() => setIndex(index === 0 ? 49 : index - 1)}
              className="my-5 btn btn-sm text-sm text-neutral-600"
            >
              <FaChevronLeft />
            </span>

            <div className="w-4/6 relative flex flex-col items-center">
              <span className="text-sm mb-3 -top-10 absolute text-neutral-600">
                {index + 1} / 50
              </span>

              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setIndex(+e.target.value)
                }
                type="range"
                min={0}
                max={49}
                value={index}
                className="range range-primary range-xs"
              />
            </div>

            <span
              onClick={() => setIndex(index === lastIndex ? 0 : index + 1)}
              className="my-5 btn btn-sm text-sm text-neutral-600"
            >
              <FaChevronRight />
            </span>
          </div>
        </>
      )}
    </div>
  );
};
