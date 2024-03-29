import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LangageContextProvider from "./context";
import { Advices } from "./pages/advices";
import { Welcome } from "./pages/welcome";

export default function App() {
  return (
    <LangageContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/advices" element={<Advices />} />
        </Routes>
      </BrowserRouter>
    </LangageContextProvider>
  );
}
