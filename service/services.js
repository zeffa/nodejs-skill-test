import moment from 'moment'
import Transaction from '../models/transactions'

// Function to calculate monthly compound interest
export const compoundInterestCalculator = (principleAmount, interestRatePerMonth, noOfMonths) => {
    //Assume
    // 1. interest if monthly interest
    //2. period given is in months
    return new Promise((resolve, reject) => {
        try {
            let onePlusInterestAmt = 1 + (interestRatePerMonth / 100)
            let _exponent = Math.pow(onePlusInterestAmt, noOfMonths);
            let exponentMinusOne = _exponent - 1;
            let monthlyCompoundInterest = principleAmount * exponentMinusOne;
            resolve({success: 1, compoundInterest: monthlyCompoundInterest})
        } catch (e) {
            reject(e)
        }
    })
};

// Function to calculate monthly compound interest
export const simpleInterestCalculator = (principleAmount, interestRatePerMonth, noOfMonths) => {
    //Assume
    // 1. interest if monthly interest
    //2. period given is in months

    return new Promise((resolve, reject) => {
        try {
            let rate = interestRatePerMonth / 100;
            let monthlySimpleInterest = principleAmount * rate * noOfMonths;
            resolve({simpleInterest: monthlySimpleInterest})
        } catch (e) {
            reject(e)
        }
    });
};

export const costOfTransaction = (price) => {

    return new Promise((resolve, reject)=>{
        try {
            let cost;
            if (price > 0 && price <= 100) {
                cost = 0
            } else if (price > 100 && price <= 500) {
                cost = 11;
            } else if (price > 500 && price <= 1000) {
                cost = 15
            } else if (price > 1000 && price <= 1500) {
                cost = 25;
            }else {
                reject("Amount out of given Matrix")
            }
            resolve(cost)
        }catch (e) {
            reject(e)
        }
    })
};

export const withHoldingTax = (income) => {

    return new Promise((resolve, reject)=>{
        try {
            if (isNaN(income)) {
                reject("Income should be number");
            }else if (income < 0) {
                reject("Income should be value greater than or equal to zero")
            }else {
                resolve(income * (5 / 100))
            }
        }catch (e) {
            reject(e)
        }
    })
    // if (isNaN(income)) {
    //     throw new Error("Income should be number");
    // }
    // if (income < 0) {
    //     throw new Error("Income should be value greater than or equal to zero")
    // }
    // return income * (5 / 100);
};

export const vatCalculator = (price) => {
    return new Promise((resolve, reject)=>{
        if (isNaN(price)) {
            reject("Price should be number")
        }else if (price <= 0) {
            reject("Item should have realistic price")
        }else {
            resolve(price * (16 / 100))
        }
    })
    // if (isNaN(price)) {
    //     throw new Error("Price should be number")
    // }
    // if (price <= 0) {
    //     throw new Error("Item should have realistic price")
    // }
    // return price * (16 / 100);
};

export const itemDiscount = (amount, _discountInPercentage) => {
    return new Promise((resolve, reject)=>{
        try {
            if (isNaN(amount) || isNaN(_discountInPercentage)) {
                reject("Requires amount and discount to be numbers")
            } else if (amount < 0 || _discountInPercentage < 0) {
                reject("Amount and/or discount cannot be less than zero")
            } else {
                resolve((_discountInPercentage / 100) * amount)
            }
        }catch (e) {
            reject(e)
        }
    })
}

export const noOfDaysLeftInMonthFromGivenDate = (date) => {
    return new Promise((resolve, reject)=>{
        try {
            let givenDay = moment(date, 'DD-MM-YYYY');
            let endDayOfMonth = moment(givenDay).endOf('month');
            let days = endDayOfMonth.diff(givenDay, 'days')
            console.log(days, givenDay)
            //Current day included in the +1
            resolve(days+1)
        }catch (e) {
            reject(e)
        }
    })
}

export const noOfDaysLeftInYearFromGivenDate = (date) => {
    return new Promise((resolve, reject)=>{
        try {
            let givenDay = moment(date, 'DD-MM-YYYY');
            let endDayOfYear = moment(givenDay).endOf('year');
            let days = endDayOfYear.diff(givenDay, 'days')
            console.log(days + 1)
            //Include current day
            resolve(days+1)
        }catch (e) {
            reject(e)
        }
    })
}

export const noOfMonthsLeftInYearFromGivenDate = (date) => {

    return new Promise((resolve, reject)=>{
        try {
            let startTime = new Date().getTime();
            let givenDay = moment(date, 'DD-MM-YYYY');
            let endDayOfYear = moment(givenDay).endOf('year');
            let months = endDayOfYear.diff(givenDay, 'months')
            resolve(months+1)
        }catch (e) {
            reject(e)
        }
    })
    // console.log(new Date().getTime())
    // let startTime = new Date().getTime();
    // let givenDay = moment(date, 'DD-MM-YYYY');
    // let endDayOfYear = moment(givenDay).endOf('year');
    // let months = endDayOfYear.diff(givenDay, 'months')
    //
    // let endTime = new Date().getTime();
    //
    // //In seconds
    // let diff = (endTime - startTime) / 1000;
    //
    // let body = {
    //     transaction_name: 'noOfMonthsLeftInYearFromGivenDate',
    //     computation_time: diff / 1000
    // }
    // insertTransactions(body).then(transaction => console.log(transaction)).catch(error => console.log(error))
    //
    // console.log(months + 1, diff)
    // return months + 1
}

export const getAllTransactions = () => {
    return Transaction.find({}).exec();
}

export const insertTransactions = (body) => {
    let transaction = new Transaction(body)
    return transaction.save()
}

export const updateTransaction = (transactionName, body) => {
    return Transaction.findOneAndUpdate({transaction_name: transactionName}, body, {new: true}).exec()
}


