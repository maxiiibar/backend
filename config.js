import 'dotenv/config'
export default {
  NODE_ENV: process.env.NODE_ENV,
  PERSISTENCE: "mongo",
  MONGO_URL: process.env.MONGO_ATLAS_URL,
  PORT: process.env.PORT,
  PORT_GMAIL: process.env.PORT_GMAIL,
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  PASS_ADMIN: process.env.PASS_ADMIN,
  NAME: process.env.NAME,
  EMAIL_GMAIL: process.env.EMAIL_GMAIL,
  PASS_GMAIL: process.env.PASS_GMAIL,
};
