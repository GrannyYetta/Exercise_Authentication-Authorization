/*In a production environment, it is mandatory to use a storage system, 
but for this exercise I will use the session without any storage. See more here:
https://www.npmjs.com/package/express-session#compatible-session-stores */

// const express = require("express");
// const session = require("express-session");

// const app = express();
// const port = 5000;

// app.get("/setname", (req, res) => {
//   res.send("");
// });

// app.get("/getname", (req, res) => {
//   res.send("");
// });

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// })

/* 1. create an express server with 2 routes
2. /login uses post method and takes an object with username and password and returns jwt
3. /user post method and expects a jwt token and returns welcome back + username only if the token is valid
4. /user returns string of try again if the token is invalid */

const express = require("express");
require("dotenv").config();

const app = express();
const port = 5000;
const jwt = require("jsonwebtoken");

app.use(express.json()); //

const getToken = (data) =>
  jwt.sign(data, process.env.SECRET, { expiresIn: "1h" });

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.send(getToken({ username }));
});

app.get("/user/:token", (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) res.status(403).send("Sorry, try again");
    res.send(`Welcome back, ${payload.username}`);
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
