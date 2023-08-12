
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app=express();
const port=3000;
app.use(express.static("public"));

const API_URL="https://secrets-api.appbrewery.com/";
//const BearerToken="a666cd25-85be-4b74-9f7e-7d65f2626ecc";


app.get("/",async(req,res)=>{
    try{const result= await axios.get(API_URL+"random");
    //const result=JSON.stringify(response.data);
    console.log(result.data);
    res.render("index.ejs",{secret:result.data.secret, user:result.data.username});}
    catch (error) {
        console.log(error.result.data);
        res.status(500);
      }
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})

