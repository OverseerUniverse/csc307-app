import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

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

app.use(cors()); //enable response from different origins
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const findUserByName = (name: string) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUsersByNameAndJob = (name: string, job: string) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job,
  );
};

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name;
  const job = req.query.job;

  if (typeof name === "string" && typeof job === "string") {
    let result = findUsersByNameAndJob(name, job);
    res.status(201).send({ users_list: result });
  } else {
    res.status(201).send(users);
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
    res.status(204).send("User not found.");
  }
});

//delete user
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params["id"]; //or req.params.id
  if (typeof id !== "string") {
    return res.send("id is not a string");
  }

  const user = findUserById(id);
  if (!user) {
    return res.status(404).send("User not found.");
  }

  users["users_list"] = users["users_list"].filter((u) => u.id !== id);

  res.status(200).send(`User ${user.id} deleted.`);
});

function generateId() {
  const id = Math.random().toString();
  return id;
}

const addUser = (user: User) => {
  const newUser: User = {
    id: generateId(),
    name: user.name,
    job: user.job,
  };
  users["users_list"].push(newUser);
  return newUser;
};

app.post("/users", (req: Request, res: Response) => {
  const userToAdd = req.body;
  const createdUser = addUser(userToAdd);
  res.status(201).send(createdUser);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
