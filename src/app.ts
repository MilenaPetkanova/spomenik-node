import express from 'express'
import cors from 'cors'
import db from './models'
import config from './config/config'
import routes from './routes/index'
import passport from 'passport';
import session from 'express-session'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(session({
  secret: config.jwtAccessSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use('/api/v1', routes)

try {
  db.sequelize.sync().then(() => {
    app.listen(config.serverPort, () => {
      console.log(`Welcome to the spomenik API! Endpoints available at ${config.serverUrl}:${config.serverPort}/api/v1`)
    })
  })
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`)
}



