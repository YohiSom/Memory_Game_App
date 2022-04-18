import express from 'express';
import "dotenv/config";

const app = express()

app.get("/", (req,res) => {
    res.send("welcome!!!!")
})

app.listen(process.env.PORT, () => {
    console.log("port listening from 8080")
})

