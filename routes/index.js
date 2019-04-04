import {Router} from 'express'
import {
    transactionRouter
} from "./all_app_routes"

class AppRouter {
    constructor(){
        this.appRouter = Router()
        this.initRouter()
    }

    initRouter(){
        this.appRouter.use('/transactions', transactionRouter.getRouter())
    }

    getRouter(){
        return this.appRouter
    }
}

export default AppRouter