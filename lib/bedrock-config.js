// This file is overwritten during Amplify build with actual credentials
module.exports = {
  accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.BEDROCK_SECRET_ACCESS_KEY || "",
  region: process.env.BEDROCK_REGION || "us-east-1"
};
