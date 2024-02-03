const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
// YOUR CODE GOES IN HERE
// create a blog
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).send("You must enter the title and the content");
  }
  fs.writeFileSync(title, content);
  res.end(ok);
});

// update a blog

app.put("/posts/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end("ok");
  } else {
    res.status(400).send(`there are no blog with this title: ${title}`);
  }
});

// delelte a blog

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    // Add condition here
    fs.unlinkSync(title);
    res.end("ok");
  } else {
    res.status(400).send(`there is no blog with this title: ${title}`);
  }
});

// read a blog

app.get("/blogs/:title", (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.status(200).send(post);
    res.end();
  } else {
    res.status(400).send(`there is no blog with this title: ${title}`);
  }
});

app.listen(3000);
