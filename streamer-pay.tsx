import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, CreditCard, MessageSquare, User } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StreamerPay = ({ streamerId }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const presetAmounts = [5, 10, 20, 50, 100];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          streamerId,
          amount: Number(amount),
          donorName: name,
          message,
          paymentMethod
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setPaymentData(data);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentInfo = () => {
    if (!paymentData) return null;

    switch (paymentMethod) {
      case 'pix':
        return (
          <div className="mt-4 text-center">
            <img
              src="/api/placeholder/200/200"
              alt="QR Code Pix"
              className="mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">
              Copie e cole o código Pix:
              <Input
                value={paymentData.pixCopyPaste || "Código Pix simulado"}
                readOnly
                className="mt-1"
                onClick={(e) => e.target.select()}
              />
            </div>
          </div>
        );
      
      case 'nubank':
        return (
          <div className="mt-4 text-center">
            <img
              src="/api/placeholder/200/200"
              alt="QR Code Nubank"
              className="mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">
              Abra seu app do Nubank e escaneie o QR Code
            </div>
          </div>
        );
      
      case 'picpay':
        return (
          <div className="mt-4 text-center">
            <img
              src="/api/placeholder/200/200"
              alt="QR Code PicPay"
              className="mx-auto mb-2"
            />
            <div className="text-sm text-gray-600">
              Abra seu PicPay e escaneie o QR Code
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Apoiar Streamer
          </CardTitle>
          <div className="text-center text-gray-500">
            Faça uma doação e envie sua mensagem
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome do Doador */}
            <div className="space-y-2">
              <Label htmlFor="name">Seu Nome</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  className="pl-8"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Método de Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Método de Pagamento</Label>
              <Select
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o método de pagamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="nubank">Nubank</SelectItem>
                  <SelectItem value="picpay">PicPay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Valor da Doação */}
            <div className="space-y-2">
              <Label htmlFor="amount">Valor da Doação (R$)</Label>
              <div className="relative">
                <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="Digite o valor"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                />
              </div>
            </div>

            {/* Valores Predefinidos */}
            <div className="grid grid-cols-5 gap-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setAmount(preset.toString())}
                >
                  R${preset}
                </Button>
              ))}
            </div>

            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="message">Sua Mensagem</Label>
              <div className="relative">
                <MessageSquare className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="message"
                  placeholder="Digite sua mensagem"
                  className="pl-8"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Botão de Pagamento */}
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Fazer Doação'}
            </Button>

            {/* Alerta de Sucesso */}
            {showSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Sucesso!</AlertTitle>
                <AlertDescription>
                  Sua doação foi processada com sucesso.
                </AlertDescription>
              </Alert>
            )}

            {/* Informações de Pagamento */}
            {renderPaymentInfo()}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamerPay;
