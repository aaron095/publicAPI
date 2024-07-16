import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.openuv.io/api/v1/uv?";
const lat_long = "lat=33.64&lng=-117.28"

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    headers: {"x-access-token": "openuv-15701lrlx3uofhu-io", "Content-Type": "application/json"}
}


app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + lat_long, config);
        const result = response.data.result
        res.render("index.ejs", {
            uv: result.uv,
            st1: result.safe_exposure_time.st1,
            st2: result.safe_exposure_time.st2,
            st3: result.safe_exposure_time.st3,
            st4: result.safe_exposure_time.st4,
            st5: result.safe_exposure_time.st5,
            st6: result.safe_exposure_time.st6,
        })
    }
    catch (error) {
        
        console.log("Error has occurred ", + error.response)
    
    }
})


app.post("/submit", async (req, res) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    try {
        const response = await axios.get(API_URL + "lat=" + latitude + "&lng=" + longitude, config);
        const result = response.data.result
        console.log(result.uv)
        res.render("index.ejs", {
            uv: result.uv,
            st1: result.safe_exposure_time.st1,
            st2: result.safe_exposure_time.st2,
            st3: result.safe_exposure_time.st3,
            st4: result.safe_exposure_time.st4,
            st5: result.safe_exposure_time.st5,
            st6: result.safe_exposure_time.st6,
        })
        
    }
    catch (error) {
        
        console.log("Error has occurred ", + error.response)
    
    }
})

app.listen(port, () => {
    console.log("Listening on port " + port)
})
