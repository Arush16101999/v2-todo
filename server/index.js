import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// allows to use json data in express
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Todo");
// mongodb://localhost:27017

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: Date,
});

const TodoModel = mongoose.model("todo", TodoSchema);

app.get("/", (req, res) => {
  res.json("hello this is Arushan from backend");
});

app.post("/api/todo", async (req, res) => {
  try {
    const newTodo = await TodoModel.create(req.body);
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/todo", async (req, res) => {
  try {
    const todo = await TodoModel.find({});
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/todo/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/todo/:id", async (req, res) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/todo/:id", async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/status/:status", async (req, res) => {
  try {
    const todo = await TodoModel.find({ status: req.params.status });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5001");
});
