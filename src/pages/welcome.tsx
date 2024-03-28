import { animated } from "@react-spring/web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/quotes");
    }, 2000);
  }, []);

  return (
    <animated.div className="flex h-screen w-screen justify-center font-serif items-center">
      <h1 className="mb-5 font-black text-3xl">wyse</h1>
    </animated.div>
  );
};
