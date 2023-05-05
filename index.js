const express = require("express");
const app = express();
const port = 3000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const fnInitRoutes = require("./src/routes");
fnInitRoutes(app);

app.listen(port, () => console.log(`Running server on port ${port}`));
