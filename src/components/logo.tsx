import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { subtitle } from "../constants/subtitle";

export const Logo: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <span
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer"
      >
        wyse
      </span>
      <h2 className="text-base text-neutral-600">
        {subtitle}
      </h2>
    </div>
  );
};
