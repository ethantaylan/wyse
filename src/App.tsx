import { animated, useSpring } from "@react-spring/web";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LangageContextProvider from "./context";
import { Quotes } from "./pages/quotes";
import { Welcome } from "./pages/welcome";

export default function App() {
  const springs = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <LangageContextProvider>
      <animated.div style={{ ...springs }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/quotes" element={<Quotes />} />
          </Routes>
        </BrowserRouter>
      </animated.div>
    </LangageContextProvider>
  );
}
