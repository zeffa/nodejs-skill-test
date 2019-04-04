import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {noOfDaysLeftInMonthFromGivenDate, noOfDaysLeftInYearFromGivenDate, noOfMonthsLeftInYearFromGivenDate} from './service/services'
export default class App {
    constructor(masterRouter, port){
        this.mongoUrl = 'mongodb://localhost/node_skill_test'
        this.app = express();
        this.port = port;
        this.masterRouter = masterRouter
        this.mongoSetup()
        this.middlewareConfig()
        this.initializeRoutes()
    }

    mongoSetup(){
        mongoose.Promise = global.Promise
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
    }

    initializeRoutes(){
        this.app.use('/api', this.masterRouter.getRouter())
    }

    loggerMiddleware(request, response, next){
        console.log(`${request.method} ${request.path}`)
        next()
    }

    middlewareConfig(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(this.loggerMiddleware)
        this.app.use(this.crossOriginAllow)
    }

    crossOriginAllow(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        next()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
    }
}