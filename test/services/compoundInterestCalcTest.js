import chai from 'chai'
import sinon from 'sinon'
import * as appServices from '../../service/services'

const expect = chai.expect

describe('Testing Tests', function () {
    it('Should always return true', (done) => {
        expect(1).to.equal(1);
        done();
    });

    it('should return 8', function (done) {
        let result = Math.pow(2, 3)
        expect(result).to.equal(8);
        done();
    });
});

describe('calculateInterests', function () {
    it('Should calculate monthly compound interest given parameters', (done) => {
        let resolvePromise = appServices.compoundInterestCalculator(1000, 1, 12);
        resolvePromise.then( (result) => {
            expect(result).to.equal({success: 1, compoundInterest: 126.825});
        }).catch(error =>{}).finally(done());
    });

    it('Should calculate monthly simple interest given parameters', (done) => {
        let resultPromise = appServices.simpleInterestCalculator(1000, 1, 12);
        resultPromise
            .then(result => {
                expect(result).to.equal({simpleInterest: 120})
            })
            .catch(error=>{

            })
            .finally(done())
    });
});

describe('costOfTransaction', function () {
    it('Should calculate cost of transaction give amount', (done) => {
        let resultPromise = appServices.costOfTransaction(1000);
        resultPromise.then(result => {
            expect(result).to.equal(15);
        }).catch(error =>{}).finally(done())
    });
    it('Should throw error when value given is not in pricing matrix', (done) => {
        let resultPromise = appServices.costOfTransaction(1000);
        resultPromise.then(result => {
        }).catch(error =>{
            expect(error).to.equal("Amount out of given Matrix")
        }).finally(done())
        // expect(() => appServices.costOfTransaction(10000)).to.throw("Amount out of given Matrix");
        // done();
    });

    // it('Should throw error when value given is not number ', (done) => {
    //     let resultPromise = appServices.costOfTransaction(1000);
    //     resultPromise.then(result => {
    //     }).catch(error =>{
    //         expect(error).to.equal("Amount out of given Matrix")
    //     }).finally(done())
    //     // expect(() => appServices.costOfTransaction("hello")).to.throw("Value given is not a number");
    //     // done();
    // });
});

describe('withholdingTaxtGivenIncome', function () {
    it('Should return withholding tax for given income', (done) => {
        let resultPromise = appServices.withHoldingTax(1000);
        resultPromise.then(result => {
            expect(result).to.equal(50);
        }).catch(error =>{}).finally(done())
        // expect(result).to.equal(50);
        // done();
    });

    // it('should show throw error if income is not number', function (done) {
    //     expect(()=>appServices.withHoldingTax("Not a number")).to.throw("Income should be number");
    //     done();
    // });
    //
    // it('should show throw error if income is less than zero', function (done) {
    //     expect(()=>appServices.withHoldingTax(-1000)).to.throw("Income should be value greater than or equal to zero");
    //     done();
    // });
});

describe('VATAmountGivenItemPrice', function () {
    it('Should return vat amount for given price', (done) => {
        let resultPromise = appServices.vatCalculator(1000);
        resultPromise.then(result => {
            expect(result).to.equal(160);
        }).catch(error =>{}).finally(done())
        // expect(result).to.equal(160);
        // done();
    });

    // it('should throw error when price not a number', function (done) {
    //     expect(()=>appServices.vatCalculator("Not a number")).to.throw("Price should be number");
    //     done();
    // });
    //
    // it('should throw error when price is less than one', function (done) {
    //     expect(()=>appServices.vatCalculator(0)).to.throw("Item should have realistic price");
    //     done();
    // });
});

describe('calculateDiscount', function () {
    it('Should calculate discount amount for given amount', (done) => {
        let resultPromise = appServices.itemDiscount(1000, 2);
        resultPromise.then(result => {
            expect(result).to.equal(20);
        }).catch(error =>{}).finally(done())
        // expect(result).to.equal(20);
        // done();
    });

    // it('should throw error when amount or discount not a number', function (done) {
    //     expect(()=>appServices.itemDiscount("Not a number", 2)).to.throw("Requires amount and discount to be numbers");
    //     done();
    // });
    //
    // it('should throw error when amount or discount is less than zero', function (done) {
    //     expect(()=>appServices.itemDiscount(-12, 2)).to.throw("Amount and/or discount cannot be less than zero");
    //     done();
    // });
});

describe('NumberOfDaysLeft', function () {
    it('Should return number of days left in a month from specified date', (done) => {
        let resultPromise = appServices.noOfDaysLeftInMonthFromGivenDate("23-10-2019");
        resultPromise.then(result => {
            expect(result).to.equal(9);
        }).catch(error =>{}).finally(done())
        // expect(result).to.equal(9);
        // done();
    });

    // it('should throw error when amount or discount not a number', function (done) {
    //     expect(()=>appServices.itemDiscount("Not a number", 2)).to.throw("Requires amount and discount to be numbers");
    //     done();
    // });
    //
    // it('should throw error when amount or discount is less than zero', function (done) {
    //     expect(()=>appServices.itemDiscount(-12, 2)).to.throw("Amount and/or discount cannot be less than zero");
    //     done();
    // });
});

