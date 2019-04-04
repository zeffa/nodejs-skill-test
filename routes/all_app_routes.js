import { Router } from "express"
import TransactionRoute from './transactions'

const router = Router();
export const transactionRouter = new TransactionRoute(router, '/')