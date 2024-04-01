import { FC } from "react";
import { FaCopy, FaWhatsapp } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
interface AdviceItemActionsProps {
  quote: string;
  onQuoteCopy: () => void;
}

export const AdviceItemActions: FC<AdviceItemActionsProps> = ({
  quote,
  onQuoteCopy,
}) => {
  return (
    <div className="flex mt-4 gap-10">
      <WhatsappShareButton
        url={`"${quote}" - from ${"50 Conseils d'un Homme de 80 Ans"}`}
      >
        <FaWhatsapp className="text-neutral-800 hover:text-white cursor-pointer text-xl" />
      </WhatsappShareButton>
      <FaCopy
        onClick={onQuoteCopy}
        className="text-neutral-800 hover:text-white cursor-pointer text-base"
      />
    </div>
  );
};
