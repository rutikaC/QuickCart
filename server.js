
import express from "express"


const app = express();
const port = process.env.port || 3000;


app.use("/", (req, res) => {
    res.json("api working")
})

app.listen(port, () => {
    console.log("App is listening on port :", port)
})