import { FC } from "react";
import { useNavigate } from "react-router-dom";

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
        {"50 Conseils d'un Homme de 80 Ans"}
      </h2>
    </div>
  );
};
