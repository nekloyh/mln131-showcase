import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/home/index.jsx";
import Header from "./components/layout/Header.jsx";
import SocialismPage from "./pages/socialism/index.jsx";
import TransitionPeriodPage from "./pages/transition-period/index.jsx";
import PodcastPage from "./pages/podcast/index.jsx";
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
        <Route path="/chu-nghia-xa-hoi" element={<SocialismPage />} />
        <Route path="/thoi-ki-qua-do" element={<TransitionPeriodPage />} />
        <Route path="/video-podcast" element={<PodcastPage />} />
        <Route path="/ai-chatbot" element={<AIChatboxPage />} />
        <Route path="/ai-usage" element={<AiUsagePage />} />
        <Route path="/informations" element={<InformationsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
