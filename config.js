import dotenv from "dotenv";

const ENV = process.argv.slice(2)[0];

dotenv.config({ path: ENV === "prod" ? "./.env.prod" : "./.env.dev" });

let MONGO_URL = null;
let PERSISTENCE = null;

if (process.argv.slice(2)[1] == "mongo"){
  PERSISTENCE = "mongo"
  if (ENV == "prod") MONGO_URL = process.env.MONGO_LOCAL_URL
  else MONGO_URL = process.env.MONGO_ATLAS_URL
}
else if (process.argv.slice(2)[1] == "fs"){
  PERSISTENCE = "fs"
}

export default {
  NODE_ENV: ENV,
  PERSISTENCE,
  MONGO_URL,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  PASS_ADMIN: process.env.PASS_ADMIN,
};
