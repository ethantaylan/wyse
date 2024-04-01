import { FC, PropsWithChildren, ReactNode } from "react";

export interface AdviceItemProps {
  index?: number;
  quote: string;
  onClick?: () => void;
  isSecondaryQuote?: boolean;
  isMainQuote?: boolean;
  children?: ReactNode
}

export const AdviceItem: FC<PropsWithChildren<AdviceItemProps>> = ({
  index,
  quote,
  onClick,
  isSecondaryQuote = false,
  isMainQuote = false,
  children,
}) => {
  return (
    <div
      onClick={onClick}
      className={
        isMainQuote
          ? "flex items-center flex-col py-5"
          : isSecondaryQuote
            ? "flex text-sm mt-3 items-center text-neutral-900 justify-center"
            : "flex cursor-pointer text-base items-center text-neutral-800 justify-center"
      }
    >
      <q>{index === 0 ? quote : quote}</q>
      {children}
    </div>
  );
};
