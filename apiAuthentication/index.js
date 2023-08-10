import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "alshabehera";
const yourPassword = "alsha098";
const yourAPIKey = "8e5d5a81-ab3b-468c-b8fb-88f65a28435b";
const yourBearerToken = "a666cd25-85be-4b74-9f7e-7d65f2626ecc";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  try{const response =await axios.get(API_URL+"random");
  const result=response.data;
  console.log(result);
  res.render("index.ejs",{ content: JSON.stringify(result)});}
  catch (error) {
    res.status(404).send(error.message);
  }
  
});

app.get("/basicAuth", async(req, res) => {

  try {
    const result = await axios.get(
      API_URL + "all?page=2",
     
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    console.log(result.data);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
 
app.get("/apiKey", async(req, res) => {
  try{const result= await axios.get(API_URL+"filter",{params:{
    score:5,
    apiKey:yourAPIKey,
  },});
  const data=JSON.stringify(result.data);
  res.render("index.ejs",{content:data});}
  catch(error){
    res.status(404).send(error.mesaage);
  }
  
});
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/bearerToken", async(req, res) => {
  try{const result= await axios.get(API_URL+"secrets/2",config);
  const data=result.data;
  res.render("index.ejs",{content:JSON.stringify(data)});}
  catch(error){
    res.status(404).send(error.message);
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
