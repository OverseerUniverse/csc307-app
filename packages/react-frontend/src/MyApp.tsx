import React, { useState, useEffect } from "react";
import ReactDOMClient from "react-dom/client";
import "./main.css";
import Table from "./Table";
import Form from "./Form";

/* Component hierarchy (in order)
MyApp - Mounting state: Render elements into the DOM and acts as a container for all other elements
Form - Updating state: handleChange updates every time a new change is made to the input field
Form - Updating state: handleSubmit updates the form props and adds props to the characters state array
Table - Unmounting state: removeCharacter destroys its given index & the useState has updateList to
change the state and trigger a re-render.
*/

interface Person {
  name: string;
  job: string;
}

// Create the container
const container = document.getElementById("root");

// Create a root
if (container) {
  const root = ReactDOMClient.createRoot(container);
  // Initial render: Render an element to the Root
  root.render(<MyApp />);
}

function MyApp() {
  const [characters, setCharacters] = useState<Person[]>([]);

  async function fetchUsers() {
    const promise = await fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(index: number) {
    const updated = characters.filter((_character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person: Person) {
    setCharacters([...characters, person]);
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
