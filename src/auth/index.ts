import express, { Request, Response } from "express";
import querystring from "querystring";
import axios from "axios";
require("dotenv").config(); // Load .env variables into process.env

// Access the variables using process.env
const client_id: string = process.env.CLIENT_ID || "";
const client_secret: string = process.env.CLIENT_SECRET || "";
const redirect_uri: string = process.env.REDIRECT_URI || "";

const router = express();

function generateRandomString(length: number): string {
  // Function implementation for generating random string
  return ""; // Implement your logic here
}

router.get("/login", function (req: Request, res: Response) {
  const state: string = generateRandomString(16);
  const scope: string = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

async function getProfile(accessToken: string | null) {
  if (!accessToken) {
    // Handle the case when access token is not available
    console.error("Access token not provided");
    return null;
  }

  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      // Handle HTTP error responses
      throw new Error("Failed to fetch profile data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any other errors that might occur during the request
    console.error("Error:", error);
    return null;
  }
}

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

      // For demonstration, let's send a response back to the client with a success message

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

export default router;
