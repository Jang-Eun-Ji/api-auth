import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "123";
const yourPassword = "45678";
const yourAPIKey = "98700186-0fda-4bb7-8ad7-ca6e66351f0a";
const yourBearerToken = "f8398010-1cbf-4df8-abd6-d989a9e7ef02";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.


  app.get("/noAuth", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "random");
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.status(404).send(error.message);
    }
    
  });



  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */

    app.get("/basicAuth", async (req, res) => {
      try {
        const result = await axios.get(API_URL +"all?page=2", {
          auth: {
            username: "123",
            password: "45678"
          },
        });
        res.render("index.ejs", { content: JSON.stringify(result.data) });
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  

  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

app.get("/apiKey", async(req, res) => {
  try {
    const result = await axios.get(API_URL + "filter?score=5", {
      params: {
        apiKey: yourAPIKey
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }

});

// app.get("/bearerToken", async (req, res) => {
//   try {
//     const result = await axios.get(API_URL + "/secrets/2", {
//       auth: {
//         Token: yourBearerToken
//       }
//     });

//     // res.render("index.ejs", { content: JSON.stringify(result.data) });
//   } catch (error) {
//     console.log(error.message)
//     res.status(404).send(error.message);
//   }
// })

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async (req, res) => {
  try {
    console.log(`${JSON.stringify(config)}`);
    const result = await axios.get(API_URL + "secrets/42", {
      headers: { Authorization: `Bearer ${yourBearerToken}` }
    });
    console.log(result.data)
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.log(error.message);
    res.status(404).send(error.message);
  }
});


  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
