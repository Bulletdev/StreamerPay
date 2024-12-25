import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  streamerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  message: String,
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  paymentMethod: {
    type: String,
    enum: ['pix', 'stripe', 'mercadopago'],
    required: true
  },
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
