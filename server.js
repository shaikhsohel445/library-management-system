const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const app=express()
const pg = require('pg');
const adminRouter=require("./routes/admin")
const userRouter=require("./routes/user")

const port=process.env.port

app.use(express.json())


const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Library_management_system',
  password: 'codetru',
  port: 5432,
});

// Connect to the PostgreSQL database
client.connect((err) => {
  if (err) {
      console.error('Error connecting to the database', err.stack);
  } else {
      console.log('Connected to the database');
  }
});
  
  
//admin
app.use("/admin",adminRouter)

//user
app.use("/user",userRouter)

app.listen((port),()=>{
    console.log(`listening of port ${port}`)
})