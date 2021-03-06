const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("blogs", {
      author: 1,
      title: 1,
      url: 1,
      likes: 1,
    });
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

userRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id).populate("blogs", {
      author: 1,
      title: 1,
      url: 1,
      likes: 1,
    });
    if (user === null) {
      return response.status(404).send({ error: "User not found" });
    }
    response.status(200).json(user);
  } catch (exception) {
    next(exception);
  }
});

userRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    if (!body.password) {
      return response.status(400).send({ error: "Password required" });
    }
    if (body.password.length < 3) {
      return response
        .status(400)
        .send({ error: "Password must be at least 3 characters" });
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).send({
      username: savedUser.username,
      name: savedUser.name,
      id: savedUser._id,
    });
  } catch (exception) {
    next(exception);
  }
});

userRouter.delete("/:id", async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
