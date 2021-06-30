require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI;

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  SECRET
}