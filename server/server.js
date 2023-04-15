const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/user", (req, res) => {
  const { firstname, lastname, email,Gender,dateofbirth, password, state, district } = req.body;
  const user = { firstname, lastname, email,Gender,dateofbirth, password, state, district };
  const users = JSON.parse(fs.readFileSync("Users.json", "utf-8"));
  users.push(user);
  fs.writeFileSync("Users.json", JSON.stringify(users));
  res.json({ message: "User added successfully" });
});

app.get("/user", (req, res) => {
  const users = JSON.parse(fs.readFileSync("Users.json", "utf-8"));
  res.json(users);
}); 
app.delete("/user/:email", (req, res) => {
  const users = JSON.parse(fs.readFileSync("Users.json", "utf-8"));
  const email = req.params.email;
  const filteredUsers = users.filter((user) => user.email !== email);
  fs.writeFileSync("Users.json", JSON.stringify(filteredUsers));
  res.json({ message: "User deleted successfully" });
});
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
