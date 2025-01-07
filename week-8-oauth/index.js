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

app.get("/user-info", async (req, res) => {
    const token = "eyJraWQiOiIyOTA1MDM0MDI2NDI2NjM1OTI4NTQ0OTEwMTg2NzcwNzE2MDc4NjQzMTk2MTE4NzAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvcGVuZW5lcmd5cGxhdGZvcm1fb3JnIiwic3ViIjoiZnFzODIzNSIsInNjb3BlIjoib3BlbmlkLHByb2ZpbGUsZW1haWwiLCJpc3MiOiJodHRwczovL3JlZ2FwcC5uZmRpLWFhaS5kZS9vaWRjL3JlYWxtcy9uZmRpIiwiZXhwIjoxNzM1NTg3MzU5LCJpYXQiOjE3MzU1ODM3NTl9.YECC-46nuI_SNPSvOP8I57J8JIPLbUzYX-P0a6HczjMxwp546Oi9PwFhkZD4_kFdNl9vX_Xq-e0yGUTt0kMAe58kGW5yl_wx4t-kq3j6LsJ6TSxnv727nQmERSSJyiJbP1QX9ceKZGgUwUVIj9Uml372eF2mgaSMe-1ta9TxM-OZtgx4GzOPstYNtnzylDJGJvTAkJrPZ5szaFRm6iiE9X6YC1oT0aiC9KzLFjdlAv6W7rxNSZ2-N3hCWGRDSYkCYNkeLeb_0WbZ7NKYBp83DkB5bXXP28iSAmEn5U4M95Uyry9Si8ESu4hjjKKbyZlN3pR2Y5YO8ppoyWhC8VsF-pj6l22Tp8xJtEkAsZ7ycEPgpas-JBeYcV_Zjea1Q06czMpZSxCcNhYt64XpKhsX5WwoS5rGjup4vpVvxWJXN7klJMvkLGD-hIlX3akhOf7-08zB_Jx9FQUFhMdycYCCnsqLKngB_a_8rnUaLbWXqOntMcUH8Nwamwr-SyssJhTDSLkw4uGcQgLi027TJTetLHlVFTFVDjDF381mxRNIQpDJLcXTcPaOzbSskiPYMpbPhzMndbuC1QB6oFVMXLPTSISex8Fcu10BvmCybGypVbOIXmnM7sFL_-GOR73vH-X9PZPozmnmxpY6O3ltb6PdQ9O_stwyjT7M4lml_yOUk2o"


    const userinfoEndpoint = 'https://regapp.nfdi-aai.de/oidc/realms/nfdi/protocol/openid-connect/userinfo';

    // Make the request
    const response = await axios.get(userinfoEndpoint, {
        headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
    })

    return res.json(response.data);
    
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
})