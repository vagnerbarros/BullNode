const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '50mb', extended : true}));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cors());

const routerProcess = require('./routes/process');

app.use(routerProcess);

const Arena = require('bull-arena');
const arena = Arena({
  queues: [
    {
        name: "Calculation",
        hostId: "Calculation",
        redis: {
          port: 6379,
          host: '127.0.0.1'
        }
    },
    {
        disableListen: true
    }
  ]
});

const PORT  = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server Running at Port ${PORT}`);
});

