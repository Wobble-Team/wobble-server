import app from "./config/express"; // how it loads routes to apps
import config from "./config/config"
const port = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'dev'){
  config.access_token = process.env.SPOTIFY_ACCESS_TOKEN;
  config.refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  config.env_type = process.env.NODE_ENV;
}

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

export default app;
