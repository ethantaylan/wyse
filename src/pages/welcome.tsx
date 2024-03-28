import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/quotes");
    }, 3000);
  }, []);

  const springs = useSpring({
    config: { duration: 2500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div
      style={{ ...springs }}
      className="flex h-screen w-screen justify-center font-serif items-center"
    >
      <h1 className="mb-5 font-black text-3xl">wyse</h1>
    </animated.div>
  );
};
