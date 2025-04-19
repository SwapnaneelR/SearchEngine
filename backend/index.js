import express from "express";
import queryHandler  from "./controllers/handleQuery.js";
import cors from "cors";

const app = express()
app.use(express.json())
 
app.use(cors());

const port = process.env.PORT || 3002

app.get('/', (req, res) => {
  res.send("Welcome to the API")
})


app.get("/search",(req,res) => {
    const q = req.query.query
    const response = queryHandler(q);
    res.status(200).send(response)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
/*

GET /


GET /search?query=get the sum of all the elements of an array

1. read the query and aply tf idf algorithm to get the most relevant documents
2. get the most relevant documents from leetcode_urls using fs mofule of js
and return them to the client

*/

