const express = require("express");
const cors = require("cors");
const mongoose = require('mongodb').MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
const budgetModel = require("./models/budget_schema");

let url = "mongodb+srv://mmatin:Osman4599@cluster0.afyz8.mongodb.net/personalBudget?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static("public"));

app.get("/budget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      budgetModel
        .find({})
        .then((data) => {
          console.log(data);
          res.json(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.post("/addBudget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      var newBudget = {
        username: req.body.username,
        data: req.body.data,
      };
      budgetModel
        .insertMany(newBudget)
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.put("/updateBudget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(res);
      budgetModel
        .updateOne(
          { username: req.body.username },
          {
            $push: {
              data: req.body.data,
            },
          }
        )
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
          console.log(res);
        })
        .catch((connectionError) => {
          console.log(connectionError);
          console.log(res);
        });
    })

    .catch((connectionError) => {
      console.log(connectionError);
      console.log(res);
    });
});

app.delete("/deleteBudget", (req, res) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log(res);
      budgetModel
        .remove({ title: req.body.data.$.title })
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
          console.log(res);
        })
        .catch((connectionError) => {
          console.log(connectionError);
          console.log(res);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
      console.log(res);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
