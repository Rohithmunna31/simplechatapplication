const express = require("express");

const route = express.Router();
const path = require("path");
const fs = require("fs");

route.get("/login", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "loginpage.html"));
});

route.get("/", (req, res, next) => {
  let msgsFilePath = path.join(__dirname, "../", "messages.txt");

  let msgs = fs.readFileSync(msgsFilePath, {
    encoding: "utf8",
    flag: "r",
  });

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>chat page</title>
    </head>
    <body>
      ${msgs || "No chats exist"}
      <form action="/" method="post">
        <input type="text" name="message" id="message" />
        <input type="hidden" name="username" id="username" value="" />
        <button type="submit" id="send">Send</button>
      </form>
      <script>
        let button = document.getElementById("submit");
  
        window.onload = () => {
          let username = localStorage.getItem("username");
          document.getElementById("username").value = username;
        };
      </script>
    </body>
  </html>
  `);
});

route.post("/", (req, res) => {
  let msgsFilePath = path.join(__dirname, "../", "messages.txt");
  let { username, message } = req.body;
  if (username && message)
    fs.appendFileSync(msgsFilePath, `${username} : ${message} `);

  res.redirect("/");
});

module.exports = route;
