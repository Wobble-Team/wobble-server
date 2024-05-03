export default interface AppConfig {
    access_token?: string; // ttl is 1 hour
    refresh_token?: string; //can get new accesstokens from refreshTokens
    // Add other properties as needed
    env_type?: string;
  }