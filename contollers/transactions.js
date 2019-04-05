import * as services from '../service/services'

export class TransactionsController {
    getAllTransactions(req, res) {
        let startTime = new Date().getMilliseconds()
        services.getAllTransactions()
            .then(users=>{
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(TransactionsController.formulateTransactionObject("Fetching Transactions", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(users)
            })
            .catch(error=>res.json(error))
    }

    insertTransaction(req, res){
        let startTime = new Date().getMilliseconds()
        services.insertTransactions(req.body)
            .then(transaction => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(TransactionsController.formulateTransactionObject("Transaction creation", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(transaction)
            })
            .catch(error => res.json(error))
    }

    updateTransaction(req, res){
        let startTime = new Date().getMilliseconds()
        services.updateTransaction(req.params.transactionName, req.body)
            .then(transaction=>{
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(TransactionsController.formulateTransactionObject("Update Transaction", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(transaction)
            })
            .catch(error=>res.json(error))
    }

    getCompoundInterest(req, res){
        let startTime = new Date().getMilliseconds()
        const body = req.body
        let principalAmt = body.principal_amount
        let monthlyInterestRate = body.monthly_interest_rate
        let noOfMonths = body.number_of_months
        services.compoundInterestCalculator(principalAmt,  monthlyInterestRate, noOfMonths)
            .then(response => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime

                return {diff, compound_interest:response}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Compound interest calculator", result.diff))
                    .then(response => {
                        console.log(res, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.compound_interest})
                    })
            })
            .catch(error=>res.json(error));
    }

    getSimpleInterest(req, res){
        let startTime = new Date().getMilliseconds()
        const body = req.body
        let principalAmt = body.principal_amount
        let monthlyInterestRate = body.monthly_interest_rate
        let noOfMonths = body.number_of_months
        services.simpleInterestCalculator(principalAmt,  monthlyInterestRate, noOfMonths)
            .then(response => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime

                return {diff:diff, simple_interest:response}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Simple interest calc", result.diff))
                    .then(response => {
                        console.log(res, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.simple_interest})
                    })
            })
            .catch(error=>res.json(error));
    }

    getCostOfTransaction(req, res){
        let startTime = Date.now()
        const price = req.body.price
        services.costOfTransaction(price)
            .then(result => {
                let endTime = Date.now()
                let diff = endTime - startTime
                return {diff:diff, cost: result}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Cost of Transaction", result.diff))
                    .then(response => {
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.cost})
                    })
            })
            .catch(error => res.json(error))
    }

    getWithholdingTax(req, res){
        let startTime = new Date().getMilliseconds()
        const income = req.body.income
        services.withHoldingTax(income)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff = endTime -startTime
                return {diff:diff, withholding_tax:result}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Withholding tax calculator", result.diff))
                    .then(response => {
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.withholding_tax})
                    })
            })
            .catch(error => res.json(error))
    }

    getVatTax(req, res){
        let startTime = new Date().getMilliseconds()
        const price = req.body.price
        services.vatCalculator(price)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                return {diff:diff, vatValue:result}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Vat tax calculator", result.diff))
                    .then(response => {
                        console.log(res, result)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.vatValue})
                    })
            })
            .catch(error => res.json(error))
    }

    getItemDiscount(req, res){
        let startTime = new Date().getMilliseconds()
        const amount = req.body.amount
        const discountPercent = req.body.percentage_discount
        services.itemDiscount(amount, discountPercent)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime

                return {diff:diff, discount: result}
                // res.json(result)
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Item discount calculator", result.diff))
                    .then(response => {
                        console.log(response, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.discount})
                    })
            })
            .catch(error => res.json(error))
    }

    getDaysLeftInMonth(req, res){
        let startTime = new Date().getMilliseconds()
        const fromDate = req.body.from_date
        services.noOfDaysLeftInMonthFromGivenDate(fromDate)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                return  {"diff":diff, "days_in_Month":result}
            })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Number of day left in Month", result.diff))
                    .then(response => {
                        console.log(res, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.days_in_Month})
                    })
            })
            .catch(error => res.json(error))
    }

    getDaysLeftInYear(req, res){
        let startTime = new Date().getMilliseconds()
        const fromDate = req.body.from_date
        services.noOfDaysLeftInYearFromGivenDate(fromDate).then(result => {
            let endTime = new Date().getMilliseconds()
            let diff  = endTime - startTime
            return  {"diff":diff, "days_in_year":result}
        })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("No of days left in year", result.diff))
                    .then(response => {
                        console.log(res, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.days_in_year})
                    })
            })
            .catch(error => res.json(error))
    }

    getMonthsLeftInYear(req, res){
        let startTime = new Date().getMilliseconds()
        const fromDate = req.body.from_date
        services.noOfMonthsLeftInYearFromGivenDate(fromDate).then(result => {
            let endTime = new Date().getMilliseconds()
            let diff  = endTime - startTime

            return  {"diff":diff, "months_in_year":result}
        })
            .then(result => {
                services.insertTransactions(TransactionsController.formulateTransactionObject("Months left in year", result.diff))
                    .then(response => {
                        console.log(res, result.diff)
                        res.json({transaction_name: response.transaction_name, computation_time: response.computation_time, created_at: response.createdAt, updated_at: response.updatedAt, result: result.months_in_year})
                    })
            })
            .catch(error => res.json(error))
    }

    static formulateTransactionObject(txnName, computeTime){
        return {
            transaction_name: txnName,
            computation_time: computeTime
        }
    }
}
