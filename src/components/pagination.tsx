import { ChangeEvent, FC } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface PaginationProps {
  onLastQuote: () => void;
  onNextQuote: () => void;
  onSetIndex: (e: ChangeEvent<HTMLInputElement>) => void;
  index: number;
}

export const Pagination: FC<PaginationProps> = ({
  onLastQuote,
  onNextQuote,
  onSetIndex,
  index,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        onClick={onLastQuote}
        className="my-5 btn btn-sm text-sm text-neutral-600"
      >
        <FaChevronLeft />
      </button>

      <div className="w-4/6 relative flex flex-col items-center">
        <span className="text-sm -top-10 absolute text-neutral-600">
          {index + 1} / 50
        </span>

        <input
          onChange={onSetIndex}
          type="range"
          min={0}
          max={49}
          value={index}
          className="range range-primary range-xs"
        />
      </div>

      <button
        onClick={onNextQuote}
        className="btn btn-sm text-sm text-neutral-600"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
