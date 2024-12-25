import Stripe from 'stripe';
import MercadoPagoConfig, { Payment as MPPayment } from 'mercadopago';
import axios from 'axios';
import Payment from '../models/Payment.js';
import { createNotification } from './NotificationService.js';

export class PaymentService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
  }

  async createPixPayment(streamerId, amount, donorName, message) {
    try {
      // Gerar QR Code do Pix usando API do Banco
      const pixData = await this.generatePixQRCode(amount);
      
      const payment = new Payment({
        streamerId,
        donorName,
        amount,
        message,
        paymentMethod: 'pix',
        paymentId: pixData.id
      });
      
      await payment.save();
      return { 
        paymentId: payment._id,
        pixQRCode: pixData.qrCode,
        pixCopyPaste: pixData.copyPaste
      };
    } catch (error) {
      throw new Error('Erro ao criar pagamento Pix');
    }
  }

  async createStripePayment(streamerId, amount, donorName, message) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100, // Stripe usa centavos
        currency: 'brl',
        metadata: { streamerId, donorName, message }
      });

      const payment = new Payment({
        streamerId,
        donorName,
        amount,
        message,
        paymentMethod: 'stripe',
        paymentId: paymentIntent.id
      });

      await payment.save();
      return { 
        paymentId: payment._id,
        clientSecret: paymentIntent.client_secret 
      };
    } catch (error) {
      throw new Error('Erro ao criar pagamento Stripe');
    }
  }

  async createMercadoPagoPayment(streamerId, amount, donorName, message) {
    try {
      const payment = new MPPayment(this.mercadopago);
      const paymentData = await payment.create({
        body: {
          transaction_amount: amount,
          description: `Doação para streamer - ${message}`,
          payment_method_id: 'pix',
          payer: {
            email: 'donor@email.com',
            first_name: donorName
          }
        }
      });

      const newPayment = new Payment({
        streamerId,
        donorName,
        amount,
        message,
        paymentMethod: 'mercadopago',
        paymentId: paymentData.id
      });

      await newPayment.save();
      return { 
        paymentId: newPayment._id,
        qrCode: paymentData.point_of_interaction.transaction_data.qr_code,
        qrCodeBase64: paymentData.point_of_interaction.transaction_data.qr_code_base64
      };
    } catch (error) {
      throw new Error('Erro ao criar pagamento MercadoPago');
    }
  }

  async handleWebhook(payload, service) {
    try {
      let paymentId;
      let status;

      switch (service) {
        case 'stripe':
          const event = this.stripe.webhooks.constructEvent(
            payload,
            headers['stripe-signature'],
            process.env.STRIPE_WEBHOOK_SECRET
          );
          paymentId = event.data.object.id;
          status = event.type === 'payment_intent.succeeded' ? 'completed' : 'failed';
          break;

        case 'mercadopago':
          paymentId = payload.data.id;
          status = payload.type === 'payment.updated' && payload.data.status === 'approved' 
            ? 'completed' : 'failed';
          break;

        case 'pix':
          // Implementar verificação do webhook do banco
          break;
      }

      if (paymentId && status) {
        const payment = await Payment.findOne({ paymentId });
        if (payment) {
          payment.status = status;
          await payment.save();

          if (status === 'completed') {
            await createNotification(payment.streamerId, {
              type: 'payment',
              message: `Nova doação de R$${payment.amount} de ${payment.donorName}`
            });
          }
        }
      }
    } catch (error) {
      throw new Error(`Erro ao processar webhook ${service}`);
    }
  }
}
