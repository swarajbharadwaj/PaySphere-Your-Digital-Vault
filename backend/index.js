var express = require('express');
var router = express.Router();
const cors=require('cors');

const app = express();
app.use(cors());
app.use(express.json());
router.use('/api/v1',require("./routes/index"));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});