import * as services from '../service/services'

export class TransactionsController {
    getAllTransactions(req, res) {
        let startTime = new Date().getMilliseconds()
        services.getAllTransactions()
            .then(users=>{
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(this.formulateTransactionObject("Fetching Transactions", diff))
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
                services.insertTransactions(this.formulateTransactionObject("Transaction creation", diff))
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
            .then(user=>{
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(this.formulateTransactionObject("Update Transaction", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(user)
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
                services.insertTransactions(this.formulateTransactionObject("Compound interest calculator", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(response)
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
                services.insertTransactions(this.formulateTransactionObject("Simple interest calc", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(response)
            })
            .catch(error=>res.json(error));
    }

    getCostOfTransaction(req, res){
        const price = req.body.price
        services.costOfTransaction(price)
            .then(result => res.json(result))
            .then(error => res.json(error))
    }

    getWithholdingTax(req, res){
        let startTime = new Date().getMilliseconds()
        const income = req.body.income
        services.withHoldingTax(income)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff = endTime -startTime
                services.insertTransactions(this.formulateTransactionObject("Withholding tax calculator", diff))
                    .then(res => {
                    console.log(res, diff)
                })
                res.json(result)
            })
            .then(error => res.json(error))
    }

    getVatTax(req, res){
        let startTime = new Date().getMilliseconds()
        const price = req.body.price
        services.vatCalculator(price)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(this.formulateTransactionObject("Vat tax calculator", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(result)
            })
            .then(error => res.json(error))
    }

    getItemDiscount(req, res){
        let startTime = new Date().getMilliseconds()
        const amount = req.body.amount
        const discountPercent = req.body.percentage_discount
        services.itemDiscount(amount, discountPercent)
            .then(result => {
                let endTime = new Date().getMilliseconds()
                let diff  = endTime - startTime
                services.insertTransactions(this.formulateTransactionObject("Item discount calculator", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(result)
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
                services.insertTransactions(this.formulateTransactionObject("Number of day left in Month", diff))
                    .then(res => {
                        console.log(res, diff)
                    })
                res.json(result)
            }).catch(error => res.json(error))
    }

    getDaysLeftInYear(req, res){
        let startTime = new Date().getMilliseconds()
        const fromDate = req.body.from_date
        services.noOfDaysLeftInYearFromGivenDate(fromDate).then(result => {
            let endTime = new Date().getMilliseconds()
            let diff  = endTime - startTime
            services.insertTransactions(this.formulateTransactionObject("No of days left in year", diff))
                .then(res => {
                    console.log(res, diff)
                })
            res.json(result)
        }).catch(error => res.json(error))
    }

    getMonthsLeftInYear(req, res){
        let startTime = new Date().getMilliseconds()
        const fromDate = req.body.from_date
        services.noOfMonthsLeftInYearFromGivenDate(fromDate).then(result => {
            let endTime = new Date().getMilliseconds()
            let diff  = endTime - startTime
            services.insertTransactions(this.formulateTransactionObject("Months left in year", diff))
                .then(res => {
                    console.log(res, diff)
                })
            res.json(result)
        }).catch(error => res.json(error))
    }

    formulateTransactionObject(txnName, computeTime){
        return {
            transaction_name: "Withholding tax calculator",
            computation_time: computeTime
        }
    }
}
