import "./App.css";
import React, { useState } from "react";
import IdeaCards from "./Components/IdeaCards.jsx";

export default function App() {
  return (
    <div className="app">
      {/* HEADER */}
      <header className="app-header">ClearScore Idea Board</header>
      {/* CONTENT */}
      <main className="app-main">
        <section className="app-cards-container">
          <IdeaCards />
        </section>
      </main>
    </div>
  );
}
