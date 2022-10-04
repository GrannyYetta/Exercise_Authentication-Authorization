/*In a production environment, it is mandatory to use a storage system, 
but for this exercise I will use the session without any storage. See more here:
https://www.npmjs.com/package/express-session#compatible-session-stores */

const express = require("express");
const session = require("express-session");

const app = express();
const port = 5000;

app.use(express.json());

const sessionConfig = {
    secret; 'keyboard cat',
    cookie: {secure: true}
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1;
    sessionConfig.cookie.secure = true)
}

app.use(session(sesh))




app.get("/setname", (req, res) => {
  res.send("Hello World!");
});

app.get("/getname", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
