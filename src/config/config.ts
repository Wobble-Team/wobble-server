import AppConfig from "./interfaces/Config";
//going to hold accessToken for now
let config: AppConfig = {};

if(process.env.NODE_ENV === 'dev'){
    config.access_token = process.env.SPOTIFY_ACCESS_TOKEN;
    config.refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
    config.env_type = process.env.NODE_ENV;
  }

  config.mongodb_uri = process.env.DATABASE_URL; 

export default config;