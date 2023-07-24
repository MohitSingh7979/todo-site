const express = require("express");
const path = require("path");

const PORT = 8000;
const app = express();

app.use("/static", express.static(path.join(__dirname, "..", "public")));

class Item {

  static list = {};

  static findItem(fid) {
    return Item.list[fid];
  }

  static addItem(item) {
    Item.list[item.id] = item;
  }

  static genRandomId() {
    return (10000 + Math.floor(Math.random() * 9999)).toString(16);
  }

  constructor(task) {
    this.task = task;
    this.isDone = false;
    this.id = Item.genRandomId();
  }
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/items", (req, res) => {
  const data = JSON.stringify(Item.list);
  res.send(data);
});

app.put("/item", (req, res) => {
  const { query: { task } } = req;
  const item = new Item(task);
  Item.addItem(item);
  res.send("adding new item");
});

app.post("/item", (req, res) => {
  const { query: { id, isDone } } = req;
  const item = Item.findItem(id);
  if (!item) {
    res.sendStatus(404);
  } else {
    item.isDone = JSON.parse(isDone);
    res.send("success");
  }
});

app.delete("/item", (req, res) => {
  const { query: { id } } = req;
  const item = Item.findItem(id);
  if (!item) {
    res.sendStatus(404);
  } else {
    delete Item.list[id];
    res.send("deleting item");
  }
});

app.listen(PORT);
