// Vercel Serverless Function - Entry point for the API
// This file serves as the handler for all requests on Vercel
// Routes everything through the Express app

const app = require("../backend/server");

// Export the Express app as the serverless handler
// Vercel will wrap this with proper request/response handling
module.exports = app;

