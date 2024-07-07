const express = require('express');
const router = require('./routes/index');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.use("/api/v1", router);

app.listen(3000);