import { animated, useSpring } from "@react-spring/web";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";

export const Welcome: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/advices");
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
      className="flex h-full justify-center font-serif items-center"
    >
      <Logo />
    </animated.div>
  );
};
