import mongoose from 'mongoose';

const priceHistorySchema = mongoose.Schema({
    cycle: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cycle' },
    price_inr: { type: Number, required: true },
    price_usd: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);

export default PriceHistory;
