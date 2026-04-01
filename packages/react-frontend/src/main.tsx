import React, { useState } from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import Table from "./Table";

// Create the container
const container = document.getElementById("root");

// Create a root
if (container) {
  const root = ReactDOMClient.createRoot(container);
  // Initial render: Render an element to the Root
  root.render(<MyApp />);
}

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ]);

  function removeOneCharacter(index: number) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
    </div>
  );
}

export default MyApp;
