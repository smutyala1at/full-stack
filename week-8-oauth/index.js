const dotenv = require("dotenv");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
dotenv.config();
const qs = require("qs");
const app = express();

app.use(cors());

app.get("/login", (req, res) => {
    const scope = ["openid","profile","email"];
    const authUrl = `${process.env.OIDC_AUTH_ENDPOINT}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${scope}&state=${process.env.STATE}`;
    res.redirect(authUrl);
})


app.get("/callback", async (req, res) => {
    const {code, state} = req.query;
    console.log(code, state)
    if(state !== process.env.STATE){
        return res.json({
            msg: "state mismatch"
        })
    }

    try{
        const data = qs.stringify({
            grant_type: 'authorization_code',    
            code: code,                          
            redirect_uri: process.env.REDIRECT_URI, 
            client_id: process.env.CLIENT_ID,  
            client_secret: process.env.CLIENT_SECRET,
        });

        const response = await axios.post('https://regapp.nfdi-aai.de/oidc/realms/nfdi/protocol/openid-connect/token', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            }
        });
        return res.json(response.data);  
    } catch(err){
        return res.json({
            msg: err
        })
    }
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
})