import app from "./config/express"; // how it loads routes to apps
const port = process.env.PORT || 8456;

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

export default app;
