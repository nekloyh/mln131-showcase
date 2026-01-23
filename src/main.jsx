import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Header from "./components/layout/Header.jsx";
import HomePage from "./pages/home/index.jsx";
import GovermentPage from "./pages/government/index.jsx";
import PopularPage from "./pages/popular/index.jsx";
import GamesPage from "./pages/games/index.jsx";
import AIChatboxPage from "./pages/ai/index.jsx";
import AiUsagePage from "./pages/ai-usage/index.jsx";
import InformationsPage from "./pages/informations/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trang-chu" element={<HomePage />} />
        <Route path="/bo-may-nha-nuoc" element={<GovermentPage />} />
        <Route path="/dang-va-nhan-dan" element={<PopularPage />} />
        <Route path="/tro-choi" element={<GamesPage />} />
        <Route path="/ai-chatbot" element={<AIChatboxPage />} />
        <Route path="/ai-usage" element={<AiUsagePage />} />
        <Route path="/informations" element={<InformationsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
