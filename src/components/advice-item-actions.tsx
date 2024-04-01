import { FC, useEffect, useState } from "react";
import { FaCopy, FaWhatsapp } from "react-icons/fa";
import { WhatsappShareButton } from "react-share";
import { subtitle } from "../constants/subtitle";
interface AdviceItemActionsProps {
  quote: string;
}

export const AdviceItemActions: FC<AdviceItemActionsProps> = ({ quote }) => {
  const [isCopyAlertShowing, setIsCopyAlertShowing] = useState<boolean>(false);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(quote);
    setIsCopyAlertShowing(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopyAlertShowing(false);
    }, 2000);
  }, [isCopyAlertShowing]);

  return (
    <div className="flex mt-4 gap-10">
      <WhatsappShareButton
        url={`"${quote}" - de ${subtitle}, "https://wyse-50.netlify.app/advices")}`}
      >
        <FaWhatsapp className="text-neutral-800 hover:text-white cursor-pointer text-xl" />
      </WhatsappShareButton>

      <div className="relative flex items-center">
        <FaCopy
          onClick={handleCopyQuote}
          className="text-neutral-800 hover:text-white cursor-pointer text-base"
        />

        {isCopyAlertShowing && (
          <span className="text-white left-5 absolute font-sans text-xs">
            Copied
          </span>
        )}
      </div>
    </div>
  );
};
