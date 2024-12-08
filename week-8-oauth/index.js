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
    const token = "eyJraWQiOiIyOTA1MDM0MDI2NDI2NjM1OTI4NTQ0OTEwMTg2NzcwNzE2MDc4NjQzMTk2MTE4NzAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJvcGVuZW5lcmd5cGxhdGZvcm1fb3JnIiwic3ViIjoiZnFzODIzNSIsInNjb3BlIjoib3BlbmlkLHByb2ZpbGUsZW1haWwiLCJpc3MiOiJodHRwczovL3JlZ2FwcC5uZmRpLWFhaS5kZS9vaWRjL3JlYWxtcy9uZmRpIiwiZXhwIjoxNzMzMjMyNDgzLCJpYXQiOjE3MzMyMjg4ODN9.j2s3cVKhwYSplzHnftJWYEylfxK80BBmEeywC7YKIlchMNrAqrHbPldX5w1zGRtW5CaoFjdEbIejXuhqoFyFrNFraKoSGy4u0oG3c7S3VDQ54Q_TWBKA2c8jcjNBabyIMfaq1i1aANZit-N9Of7nRcXVUNPKkfRzmiUglVU5rtGKDKOE0nEO8iu0twlUOzw2zzHaJ3ev0WjLYlo5BXSkIjpgifO-7x_ne3kN8epGCM5Zx-XqAwQ8eVIuHYi72dWfvTIiMFfjg4S4ajYk9Rb7-iZ1qpa7G9xqkZbxo_p81iCNHnQrLBE7NN1LZyG0qpsUJpXXWVpqwMyIqotgBxaeOdRNfZddBDETIMNcnlPnjZqqicW9XIz-lag61Xjsbs-qNKG5rea1sOW8yfRKktXut1uRQdI5hjsqdOxwtvgMFoBFWKWInKgdgx-MY5rBdPJhkDtQRRIUxGcr_YKFeur8FmHx_A66f0zkMzLabeiZBphAcY5Xrngif0zoEw8HgUUilSZvd1CS6qjy86E5K_G3D-unrczmuafO6lX5-IksXXzIYFKyPWJOtnUyNyoS19HH5TovWFV39Xbn8hAj7zMvPSAWIX0b8TYGMDgwUuvrIJEKItUVeNMK1SU9BaPsEGhGX7gbaDyWDnvaNNG-YyrYqGuBzXrps3HivKdHPLB-Vzs"


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