import { useNavigate } from "react-router-dom";
import { SelectLangage } from "../components/select-langage";
import { useLangageState } from "../context";

export const Welcome = () => {
  const navigate = useNavigate();
  const { langage } = useLangageState();

  return (
    <div className="font-serif flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center">
        <h1 className="mb-5 font-black text-5xl">wyse</h1>
        <SelectLangage />

        <button
          onClick={() => navigate("/quotes")}
          className="mt-10 hover:font-bold"
        >
          {langage === "fr" ? "Entrer" : "Enter"}
        </button>
      </div>
    </div>
  );
};
