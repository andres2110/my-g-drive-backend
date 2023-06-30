const express = require("express");
const cors = require('cors');
const app = express();
const port = 3001;

// app.use(express.urlencoded({ extended: true }));
const oCorsOpt = {
    origin: 'http://localhost:3000'
}
app.use(cors(oCorsOpt));
app.use(express.json());
const fnInitRoutes = require("./src/routes");
fnInitRoutes(app);

app.listen(port, () => console.log(`Running server on port ${port}`));
