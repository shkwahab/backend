const express = require("express");
const app =express();
const dotenv = require("dotenv")

dotenv.config({path:'./.env'})

require("./db/conn")

app.use(express.json());
app.use(require('../backend/router/auth'))


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at ${process.env.PORT}`)
})