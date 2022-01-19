var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var axios = require("axios");
var app = express();
var cors = require("cors");

var mqtt = require("mqtt");

// Your Channel access token (long-lived)
const CH_ACCESS_TOKEN =
  "r6060LoSKo7PEZgAmFxZQZeEQst79nrlo7IKol6uDXX";

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/sendtoline", async (req, res) => {
  console.log(req.body);

  const data = {
    messages: [
      {
        type: "text",
        text: req.body.message,
      },
    ],
  };

  request(
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + CH_ACCESS_TOKEN + "",
      },
      url: "https://api.line.me/v2/bot/message/broadcast",
      method: "POST",
      body: data,
      json: true,
    },
    function (err, res, body) {
      if (err) console.log(err);
      if (res) console.log("success");
      // if (body) console.log(body);
    }
  );
  res.sendStatus(200);
});

app.listen(app.get("port"), function () {
  console.log("run at port", app.get("port"));
});
