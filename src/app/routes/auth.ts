import express, { Request, Response } from "express";
import querystring from "querystring";
import axios from "axios";
import config from "../../config/config"
import fs from "fs";
require("dotenv").config();

// Access the variables using process.env
const client_id: string = process.env.CLIENT_ID || "";
const client_secret: string = process.env.CLIENT_SECRET || "";
const redirect_uri: string = process.env.REDIRECT_URI || "";

const router = express();

router.get("/login", async function (req: Request, res: Response) {
  const state: string = generateRandomString(16);
  const scope: string = "user-read-private user-read-email user-top-read";

  const authorizationUrl =
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
      console.log(authorizationUrl)
      res.send(authorizationUrl)
      // res.redirect(authorizationUrl)
});

async function getProfile(accessToken: string | null) {
  if (!accessToken) {
    // Handle the case when access token is not available
    console.error("Access token not provided");
    return null;
  }

  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

    if (response.status < 200 || response.status >= 300) {
      // Handle HTTP error responses
      throw new Error("Failed to fetch profile data");
    }

    return await response.data;
  } catch (error) {
    // Handle any other errors that might occur during the request
    console.error("Error:", error);
    return null;
  }
}

router.get("/refreshTokens", async function (req: Request, res: Response) {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST", // Ensure the method is set to POST
    data: {
      client_id: client_id,
      refresh_token: config.refresh_token,
      grant_type: 'refresh_token',
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  };
  const response = await axios(authOptions);
  if(config.env_type === "dev"){
    console.log("writing to env file");
    updateEnvFile(response.data.access_token, config.refresh_token as string);
  }

  res.status(200).json("updated tokens hopefully")
});

router.get("/callback", async function (req: Request, res: Response) {
  const code: string | null = (req.query.code as string) || null;
  const state: string | null = (req.query.state as string) || null;

  if (code === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "POST", // Ensure the method is set to POST
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    };

    try {
      // Send the POST request using Axios
      const response = await axios(authOptions);
      if(config.env_type === "dev"){
        console.log("writing to env file");
        updateEnvFile(response.data.access_token, response.data.refresh_token);
      }
      const profile_data = await getProfile(response.data.access_token);

      const responseBody = `
        <html>
          <head>
            <title>Authentication Callback</title>
          </head>
          <body>
            <h1>Authentication successful!</h1>
            <p>You can now close this window.</p>
            <p>Welcome to Wobble: ${profile_data.display_name} - ${profile_data.email}</p>
          </body>
        </html>
      `;
      res.send(responseBody);
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error:", error);
      res.status(500).send("Error occurred during authorization");
    }
  }
});


function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

function updateEnvFile(newAccessToken: string, newRefreshToken: string) {
  try {
    const envFileContent = fs.readFileSync('.env', 'utf8');

    const lines = envFileContent.split('\n');

    // Update token values if they exist in the file
    const updatedLines = lines.map(line => {
      if (line.startsWith('SPOTIFY_ACCESS_TOKEN=')) {
        return `SPOTIFY_ACCESS_TOKEN=${newAccessToken}`;
      } else if (line.startsWith('SPOTIFY_REFRESH_TOKEN=')) {
        return `SPOTIFY_REFRESH_TOKEN=${newRefreshToken}`;
      }
      return line;
    });

    // Write the updated content back to the .env file
    fs.writeFileSync('.env', updatedLines.join('\n'));

    console.log('Tokens updated successfully.');

  } catch (error) {
    console.error('Failed to update tokens in .env file:', error);
  }
}

export default router;
