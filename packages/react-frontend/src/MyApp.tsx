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
  id: string;
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

  async function removeUser(index: number) {
    const userToDelete = characters[index];
    try {
      const promise = await fetch(
        `http://localhost:8000/users/${userToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!promise.ok) {
        throw new Error("Failed to delete user");
      }
      const updated = characters.filter((_character, i) => i !== index);
      setCharacters(updated);
    } catch (error) {
      console.log(error);
    }
  }

  async function postUser(person: Person) {
    const promise = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person: Person) {
    postUser(person)
      .then((res) => res.json())
      .then((createdUser) => setCharacters([...characters, createdUser]))
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeUser} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
