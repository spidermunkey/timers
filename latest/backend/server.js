const express = require("express");
const path = require("path");

const app = express();

const publicDirectory = path.join(__dirname, "..","frontend")
app.use("/static", express.static(publicDirectory))

app.get("/*", (req,res) => {
  res.sendFile(path.resolve("frontend","html/index.html"));
})

app.listen(process.env.PORT || 1995, () => console.log("server running 1995..."))