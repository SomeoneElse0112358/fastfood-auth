const dotenv = require('dotenv');
const { cleanEnv, str } = require('envalid');

dotenv.config({ path: './.env' });

const env = cleanEnv(process.env, {
  PORT: str(),
  TOKEN_SECRET: str(),
  SESSION_SECRET: str(),
  DB_HOST: str({ default: 'fastfood-mongo' }),
  DB_PORT: str({ default: '27017' }),
  DB_NAME: str({ default: 'fastfooddb' }),
  EMAIL_PASSWORD: str(),
  EMAIL: str()
});

module.exports = {
  emailOfSendler: env.EMAIL,
  passwordOfSendler: env.EMAIL_PASSWORD,
  port: env.PORT,
  secretToken: env.TOKEN_SECRET,
  secretSession: env.SESSION_SECRET,
  database: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    name: env.DB_NAME,
    url: `mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`
  }
};
