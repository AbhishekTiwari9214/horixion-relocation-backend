var axios = require("axios");

async function refreshtoken(idToken){
    return new Promise(async (resolve, reject) => {
        const data = {
            grant_type:"urn:ietf:params:oauth:grant-type:jwt-bearer",
            // grant_type:"refresh_token",
            client_id:"98c3952a-55d2-43fe-930f-4222eded784f",
            client_secret:"xty8Q~k9QDdjmqWSR.MoERn2I6WdThiLwl3TccwF",
            assertion:idToken,
            scope:"https://graph.microsoft.com/user.read+offline_access",
            requested_token_use:"on_behalf_of",
            resource:"https://graph.microsoft.com",
        }

        const response = await axios.post(
        "https://login.microsoftonline.com/e4e34038-ea1f-4882-b6e8-ccd776459ca0/oauth2/token", 
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "X-Requested-With": "XMLHttpRequest",
                    },
                    crossDomain: true,
        }
        ).then((res)=>resolve({access_token:res.data.access_token,refresh_token:res.data.refresh_token})).catch((error)=>reject(error))
    })
}

async function refreshtokenFromrefreshtoken(idToken){
    return new Promise(async (resolve, reject) => {
        const data = {
            client_id:"98c3952a-55d2-43fe-930f-4222eded784f",
            client_secret:"xty8Q~k9QDdjmqWSR.MoERn2I6WdThiLwl3TccwF",
            scope:"user.read mail.read offline_access User.ReadBasic.All",
            grant_type:"refresh_token",
            refresh_token:idToken
        }

        const response = await axios.post(
        "https://login.microsoftonline.com/common/oauth2/v2.0/token",
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "X-Requested-With": "XMLHttpRequest",
                    },
                    crossDomain: true,
        }
        ).then((res)=>resolve({access_token:res.data.access_token,refresh_token:res.data.refresh_token})).catch((error)=>reject(error))
    })
}

async function generateAccessTokenForFunctionApp(){
    return new Promise(async (resolve, reject) => {
        const data = {
            client_id:"98c3952a-55d2-43fe-930f-4222eded784f",
            client_secret:"xty8Q~k9QDdjmqWSR.MoERn2I6WdThiLwl3TccwF",
            scope:"https://graph.microsoft.com/.default",
            grant_type:"client_credentials"
        }

        const response = await axios.post(
        "https://login.microsoftonline.com/e4e34038-ea1f-4882-b6e8-ccd776459ca0/oauth2/v2.0/token",
        data,
        {
            headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "X-Requested-With": "XMLHttpRequest",
                    },
                    crossDomain: true,
        }
        ).then((res)=>resolve(res.data.access_token)).catch((error)=>reject(error))
    })
}


module.exports = {refreshtoken,refreshtokenFromrefreshtoken,generateAccessTokenForFunctionApp}