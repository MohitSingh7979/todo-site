const express = require("express");
const path = require("path");

const PORT = 8000;
const app = express();

app.use("/static", express.static(path.join(__dirname, "..", "public")));

class Item{

  static list = {
    "3284": {
      "task": "lohiya",
      "isDone": true,
      "id": "3284"
    },
    "48c5": {
      "task": "mohit",
      "isDone": false,
      "id": "48c5"
    },
    "2b91": {
      "task": "singh",
      "isDone": true,
      "id": "2b91"
    },
    "48f6": {
      "task": "ankush",
      "isDone": false,
      "id": "48f6"
    },
    "39e8": {
      "task": "ankit",
      "isDone": false,
      "id": "39e8"
    },
    "3f55": {
      "task": "swami",
      "isDone": false,
      "id": "3f55"
    },
    "2eb0": {
      "task": "shivam",
      "isDone": true,
      "id": "2eb0"
    },
    "27fa": {
      "task": "gupta",
      "isDone": false,
      "id": "27fa"
    },
    "32c1": {
      "task": "surender",
      "isDone": false,
      "id": "32c1"
    },
    "455f": {
      "task": "kumar",
      "isDone": false,
      "id": "455f"
    }
  };

  static findItem(fid){
    return Item.list[fid];
  }

  static addItem(item){
    Item.list[item.id] = item;
  }

  static genRandomId(){
    return (10000 + Math.floor(Math.random() * 9999)).toString(16);
  }

  constructor(task){
    this.task = task;
    this.isDone = false;
    this.id = Item.genRandomId();
  }
};

app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/items", (req, res)=>{
  const data = JSON.stringify(Item.list);
  res.send(data);
});

app.put("/item", (req, res) =>{
  const {query:{task}} = req;
  const item = new Item(task);
  Item.addItem(item);
  res.send("adding new item");
});

app.post("/item", (req, res)=>{
  const {query:{id, isDone}} = req;
  const item = Item.findItem(id);
  if(!item){
    res.sendStatus(404);
  }else{
    item.isDone = JSON.parse(isDone);
    res.send("success");
  }
});

app.delete("/item", (req, res)=>{
  const {query:{id}} = req;
  const item = Item.findItem(id);
  if(!item){
    res.sendStatus(404);
  }else{
    delete Item.list[id];
    res.send("deleting item");
  }
});

app.listen(PORT);
