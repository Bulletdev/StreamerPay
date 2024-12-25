import express from 'express';
import { PaymentService } from '../services/PaymentService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const paymentService = new PaymentService();

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { streamerId, amount, donorName, message, paymentMethod } = req.body;
    
    let paymentResponse;
    switch (paymentMethod) {
      case 'pix':
        paymentResponse = await paymentService.createPixPayment(
          streamerId, amount, donorName, message
        );
        break;
      case 'stripe':
        paymentResponse = await paymentService.createStripePayment(
          streamerId, amount, donorName, message
        );
        break;
      case 'mercadopago':
        paymentResponse = await paymentService.createMercadoPagoPayment(
          streamerId, amount, donorName, message
        );
        break;
      default:
        throw new Error('Método de pagamento inválido');
    }

    res.json(paymentResponse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/webhook/:service', async (req, res) => {
  try {
    await paymentService.handleWebhook(req.body, req.params.service);
    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
