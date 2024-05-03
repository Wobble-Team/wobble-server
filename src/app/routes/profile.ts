import express, { Request, Response } from "express";
import axios from "axios";
import config from "../../config/config"

const router = express.Router();

// Define routes
router.get('/', getProfile);

//define function
async function getProfile (req: Request, res: Response) {
    // config.accessToken = "BQB9HKYpA27UUAxviPPL5_0dL0iIu2Lp6K3f7WCVBRmitMeGP7FcbbgV1CzMgHwVS8hVDv58rcYRBAPHGldb-DehtZTwgElnad1YBDFF6pnWuX_HhnGNEEcP4ukOHF5MwKYqqOwlu2YsGW7WTZBVdpujK0_tji1MijLisYfBCLZXYIZsccpFOEOkrfO4Z5ToWtJsBMoZxHCKv7YZeMDfFQ"
    let token = config.accessToken;

    if(!token){
        res.status(500).json('no token was passed in need to login again');
    }
    const url = 'https://api.spotify.com/v1/me';

    const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.status(200).json(response.data);
}


export default router;