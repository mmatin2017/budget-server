const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {MongoClient} = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;
const budgetModel = require("./models/budget_schema");

let url = "mongodb+srv://mmatin:Osman4599@cluster0.afyz8.mongodb.net/personalBudget?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  


  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.use("/", express.static("public"));



app.get("/budget", (req, res) => {
  client
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      budgetModel
        .find({})
        .then((data) => {
          console.log(data);
          res.json(data);
          client.connection.close();
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
  console.log(`API app listening at http://localhost:${port}`);
});
