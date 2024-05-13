# Set environment variables for local development
export NODE_ENV=dev
export PORT=8456
export DATABASE_URL=mongodb+srv://wobble-admin:HK97psXvhqj6ezMY@wobble-dev.mowh4mx.mongodb.net/?retryWrites

# Add any other environment variables needed for local development

# Start the Node.js application
nodemon src/app.ts