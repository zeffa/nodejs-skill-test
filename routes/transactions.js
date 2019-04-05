import {TransactionsController} from '../contollers/transactions'

export default class TransactionsRoute {

    constructor(router, path) {
        this.controller = new TransactionsController()
        this.router = router;
        this.path = path
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.route(this.path)
            .get(this.controller.getAllTransactions)
            .post(this.controller.insertTransaction)

        this.router.route(`/compound_interest`)
            .post(this.controller.getCompoundInterest)

        this.router.route(`/simple_interest`)
            .post(this.controller.getSimpleInterest)

        this.router.route(`/transaction_cost`)
            .post(this.controller.getCostOfTransaction)

        this.router.route(`/withholding_tax`)
            .post(this.controller.getWithholdingTax)

        this.router.route(`/vat_tax`)
            .post(this.controller.getVatTax)

        this.router.route(`/item_discount`)
            .post(this.controller.getItemDiscount)

        this.router.route(`/days_left_in_month`)
            .post(this.controller.getDaysLeftInMonth)

        this.router.route(`/days_left_in_year`)
            .post(this.controller.getDaysLeftInYear)

        this.router.route(`/months_left_in_year`)
            .post(this.controller.getMonthsLeftInYear)

        this.router.route(`/:transactionName`)
            .put(this.controller.updateTransaction)
    }

    getRouter(){
        return this.router
    }
}
