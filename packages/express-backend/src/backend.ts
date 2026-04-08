import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 8000;

interface User {
  id: string;
  name: string;
  job: string;
}

interface UserList {
  users_list: User[];
}

const users: UserList = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const findUserByName = (name: string) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name;
  if (typeof name === "string") {
    let result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

const findUserById = (id: string): User => {
  const user = users["users_list"].find((user) => user["id"] === id);
  if (user === undefined) {
    throw new Error("user not found"); //throw handles the return type exception (never)
  }
  return user;
};

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params["id"]; //or req.params.id
  if (typeof id === "string") {
    let result = findUserById(id);
    res.send(result);
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params["id"]; //or req.params.id
  if (typeof id === "string") {
    let userId = findUserById(id);
    res.status(200).send(`User ${userId} deleted.`);
  } else {
    res.status(404).send("Resource not found.");
  }
});

const addUser = (user: User) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req: Request, res: Response) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
