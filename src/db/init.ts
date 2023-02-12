require('dotenv').config()

import { Account } from '../models'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => Promise.all([
  Account.sync({ alter: isDev }),
]) 

export default dbInit 
