import express from 'express';
import dotenv from "dotenv";
import bodyParser from "body-parser"
import db from "./model/db_connection.js"
import cors from "cors"
import user from "./routes/user.js"
import session from 'express-session';

dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const port = process.env.PORT
const app = express();
app.listen(port,()=>{
    console.log(`server listening at http://127.0.0.1:${port}`);
});


app.use(cors({
    origin: ['http://localhost:3000'],
    methods:["GET","POST"],
    credentials:true,
}))

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
  }));
  


db(()=>{})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: '400kb'}));
app.use("/",user)