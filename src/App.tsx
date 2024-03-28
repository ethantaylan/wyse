import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LangageContextProvider from "./context";
import { Quotes } from "./pages/quotes";
import { Welcome } from "./pages/welcome";

export default function App() {
  return (
    <LangageContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/quotes" element={<Quotes />} />
        </Routes>
      </BrowserRouter>
    </LangageContextProvider>
  );
}
