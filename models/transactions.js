import mongoose from 'mongoose'

const Schema = mongoose.Schema
const TransactionSchema = new Schema({
    transaction_name: {
        type: String,
        required: 'Enter a first name'
    },
    computation_time: {
        type: Number,
        required: 'Enter a last name'
    }
},{timestamps: true});

export default mongoose.model('Transaction', TransactionSchema)