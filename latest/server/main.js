const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 1280;

app.use(express.static(path.resolve(__dirname, "..", "development")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "development", "index.html"));
});

app.listen(process.env.PORT || 1280);

console.log("listening on", PORT);
