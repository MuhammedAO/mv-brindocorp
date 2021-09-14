// import querystring from "query-string"
const axios = require("axios")


 async function getTokens({code, clientId, clientSecret,}) {
  /*
   * Uses the code to get tokens
   * that can be used to fetch the user's profile
   */
  let auth =
  "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64")
  const url = "https://api.epicgames.dev/epic/oauth/v1/token"
  const values = new URLSearchParams({
    code,
    clientId,
    clientSecret,
    grant_type: "authorization_code",
  })

  
  try {
    const response = await axios.post(url, values, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": auth,
      },
    })
    // console.log(response.headers)
    return response.data
  } catch (error) {
    let message = error.response.data
    console.log(message)
    return message
    // throw new Error(error.message)
  }
}

module.exports = getTokens
