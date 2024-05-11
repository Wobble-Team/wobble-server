import express, { Request, Response } from "express";
import axios from "axios";
import config from "../../config/config";

const router = express.Router();

// Define routes
router.get('/', getProfile);
router.get('/top', getStats);
router.get('/:user_id', getUserProfile);

//define function
async function getProfile (req: Request, res: Response) {
    let token = config.access_token;

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

async function getStats (req: Request, res: Response) {
    console.log(config)
    let token = config.access_token;

    if(!token){
        res.status(500).json('no token was passed in need to login again');
    }

    let url = 'https://api.spotify.com/v1/me/top/';

    let queryParams = req.query;

    if(!queryParams.artists && !queryParams.tracks){
        return res.status(400).json('Bad request need artists or tracks to fulfill request');
    }

    if(queryParams.artists) {
        url += 'artists'
    } else if (queryParams.tracks) {
        url += 'tracks'
    }


    const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      res.status(200).json(response.data);
}
async function getUserProfile (req: Request, res: Response) {
    let token = config.access_token;

    if(!token){
        res.status(500).json('no token was passed in need to login again');
    }
    let user_id = req.params.user_id;

    const url = `https://api.spotify.com/v1/users/${user_id}`;

    const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(!response) {
        return res.status(404).json(`User: ${user_id} not found!`);
      }

      res.status(200).json(response.data);
}


export default router;