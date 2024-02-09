const express = require("express");
const app = express();
const port = 8000;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
