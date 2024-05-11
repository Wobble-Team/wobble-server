import app from "./config/express"; // how it loads routes to apps
import mongoose  from '../src/app/models';
const port = process.env.PORT || 8080;

mongoose.db.then(() => {
  // Routes or other app setup that requires the database connection
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
}).catch((err: Error) => {
  console.error('Failed to connect to MongoDB:', err);
});

export default app;
