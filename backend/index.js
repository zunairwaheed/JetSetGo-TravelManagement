import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.get('/', (req,res)=>{
    res.send("api is working")
})

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.listen(()=>{
    console.log("server listensing on port", port)
})