import mongoose from "mongoose";
import userModel from "./user.ts";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name: string, job: string) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  } else if (job && name) {
    promise = findUserByBoth(name, job);
  }
  return promise;
}

function findUserById(id: string) {
  return userModel.findById(id);
}

function addUser(user: any) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function removeUser(id: string) {
  const promise = userModel.findByIdAndDelete(id);
  return promise;
}

function findUserByName(name: string) {
  return userModel.find({ name: name });
}

function findUserByJob(job: string) {
  return userModel.find({ job: job });
}

function findUserByBoth(name: string, job: string) {
  return userModel.find({ name: name, job: job });
}

export default {
  addUser,
  getUsers,
  removeUser,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByBoth,
};
