export default interface AppConfig {
    accessToken?: string; // ttl is 1 hour
    refreshToken?: string; //can get new accesstokens from refreshTokens
    // Add other properties as needed
  }