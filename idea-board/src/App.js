import "./App.css";
import React from "react";
import IdeaCards from "./Components/IdeaCards.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="app-header">ClearScore Idea Board</header>
      <main className="app-main">
        <section className="app-cards-container">
          <IdeaCards />
        </section>
      </main>
    </div>
  );
}
