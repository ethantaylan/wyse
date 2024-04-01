import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Welcome } from "./pages/welcome";
import { Main } from "./pages/main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/advices" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}
