import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/applayout";
import { Advices } from "./pages/advices";
import { Welcome } from "./pages/welcome";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/advices" element={<Advices />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
