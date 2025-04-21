import {envSchema, type EnvSchemaType} from "../models/config.env.model";

  if (process.env.PLATFORM !== 'docker') {
    require('dotenv').config();
  } 

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Error with .env file:");
    parsed.error.issues.forEach((issue) => {
      console.error(`→ ${issue.path.join('.')}: ${issue.message}`);
    });
    process.exit(1);
  }
  
  const env = parsed.data;

  const config = {
    PORT: env.PORT,
    NODE_ENV: env.NODE_ENV,
    DATABASE_URL: process.env.PLATFORM !== "docker" ?  env.DATABASE_URL : env.DATABASE_URL_DOCKER,
    auth0: {
      secret: env.AUTH0_SECRET,
      baseURL: env.AUTH0_BASE_URL,
      clientID: env.AUTH0_CLIENT_ID,
      issuerBaseURL: env.AUTH0_ISSUER_BASE_URL,
      authRequired:false,
      auth0Logout:true,
      idpLogout: true,
    },
    loginRedir: "http://localhost:3000/callback",
    LogoutRedir: "http://localhost:3000"
  };


  export default config;
