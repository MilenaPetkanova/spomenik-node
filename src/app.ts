import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import dbInit from './db/init'
import config from './db/config'
import routes from './routes/index'

dbInit()

export const get = () => {
    const app: Application = express()

    // Body parsing Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors())
    
    app.get('/', async(req: Request, res: Response): Promise<Response> => {
        return res.status(200).send({ message: `Welcome to the spomenik API! \n Endpoints available at http://localhost:${config.serverPort}/api/v1` })
    })
    
    app.use('/api/v1', routes)

    return app
}

export const start = () => {
    const app = get()
    try {
        app.listen(config.serverPort, () => {
            console.log(`Server running on http://localhost:${config.serverPort}`)
        })
    } catch (error: any) {
        console.log(`Error occurred: ${error.message}`)
    }
}

start()
