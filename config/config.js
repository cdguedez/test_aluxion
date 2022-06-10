require('dotenv').config()
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dialect: process.env.DB,
  dbUrl: process.env.CLEARDB_DATABASE_URL,
  keyScret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPass: process.env.SMTP_PASS,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: process.env.SMTP_PORT,
  awsSecret: process.env.AWS_SECRET,
  awsKey: process.env.AWS_KEY,
  awsBucket: process.env.AWS_BUCKET,
  upAccessKey: process.env.UP_ACCESS_KEY,
}

module.exports = config
