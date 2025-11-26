'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Headphones, Send, MessageSquare, AlertCircle, HelpCircle, CreditCard, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { getUserTickets, saveTicket, generateId } from '@/lib/storage';
import { SupportTicket } from '@/lib/types';
import { toast } from 'sonner';
import Link from 'next/link';

function SupportContent() {
  const { user, isAuthenticated } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('general');

  useEffect(() => {
    if (isAuthenticated && user) {
      const userTickets = getUserTickets(user.id);
      setTickets(userTickets.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
  }, [user, isAuthenticated]);

  const handleSubmitTicket = () => {
    if (!user) return;

    if (!subject.trim() || !message.trim()) {
      toast.error('Preencha todos os campos');
      return;
    }

    const ticketSubject = `[${category.toUpperCase()}] ${subject}`;

    const ticket: SupportTicket = {
      id: generateId(),
      userId: user.id,
      subject: ticketSubject,
      message,
      status: 'open',
      createdAt: new Date().toISOString(),
      responses: [],
    };

    saveTicket(ticket);
    setTickets([ticket, ...tickets]);
    setSubject('');
    setMessage('');
    setCategory('general');
    setShowNewTicket(false);
    toast.success('Ticket criado com sucesso! Nossa equipe responderá em breve.');
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    const variants = {
      open: { label: 'Aberto', className: 'bg-green-900/30 text-green-500 border-green-800' },
      'in-progress': { label: 'Em Andamento', className: 'bg-blue-900/30 text-blue-500 border-blue-800' },
      closed: { label: 'Fechado', className: 'bg-gray-900/30 text-gray-500 border-gray-800' },
    };

    const variant = variants[status];
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'deposits': return <CreditCard className="w-4 h-4" />;
      case 'withdrawals': return <CreditCard className="w-4 h-4" />;
      case 'bets': return <Trophy className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-yellow-500 mb-6">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>

          <div className="max-w-5xl mx-auto">
            <Card className="bg-yellow-950/20 border-yellow-900/30 p-12 text-center">
              <Headphones className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
              <p className="text-gray-400 mb-6">
                Você precisa estar logado para acessar o suporte
              </p>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                  Fazer Login
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-yellow-500 mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Headphones className="w-8 h-8 text-yellow-500" />
              <h1 className="text-4xl font-bold text-white">Suporte</h1>
            </div>
            <Button
              onClick={() => setShowNewTicket(!showNewTicket)}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Novo Ticket
            </Button>
          </div>

          {/* New Ticket Form */}
          {showNewTicket && (
            <Card className="bg-yellow-950/20 border-yellow-900/30 p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">Criar Novo Ticket</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="category" className="text-white mb-2 block">
                    Categoria
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border-yellow-900/30 text-white h-12 rounded-md px-3"
                  >
                    <option value="general">Geral</option>
                    <option value="deposits">Depósitos</option>
                    <option value="withdrawals">Saques</option>
                    <option value="bets">Apostas</option>
                    <option value="account">Conta</option>
                    <option value="technical">Técnico</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white mb-2 block">
                    Assunto
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Ex: Problema com depósito, Dúvida sobre aposta..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-black border-yellow-900/30 text-white h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white mb-2 block">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua dúvida ou problema em detalhes..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-black border-yellow-900/30 text-white min-h-[150px]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmitTicket}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Ticket
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewTicket(false);
                      setSubject('');
                      setMessage('');
                      setCategory('general');
                    }}
                    variant="outline"
                    className="border-yellow-800 text-yellow-500 hover:bg-yellow-900/20"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Tickets List */}
          {tickets.length === 0 ? (
            <Card className="bg-yellow-950/20 border-yellow-900/30 p-12 text-center">
              <Headphones className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Nenhum ticket ainda</h2>
              <p className="text-gray-400 mb-6">
                Você ainda não criou nenhum ticket de suporte
              </p>
              <Button
                onClick={() => setShowNewTicket(true)}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
              >
                Criar Primeiro Ticket
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="bg-yellow-950/20 border-yellow-900/30 p-6 hover:border-yellow-700/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {ticket.subject}
                        </h3>
                        {getStatusBadge(ticket.status)}
                      </div>

                      <p className="text-gray-400 mb-3">
                        {ticket.message}
                      </p>

                      <div className="text-sm text-gray-500">
                        Criado em {new Date(ticket.createdAt).toLocaleDateString('pt-BR')} às {new Date(ticket.createdAt).toLocaleTimeString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {ticket.responses.length > 0 && (
                    <div className="border-t border-yellow-900/30 pt-4 mt-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Respostas:</h4>
                      <div className="space-y-3">
                        {ticket.responses.map((response) => (
                          <div
                            key={response.id}
                            className={`p-3 rounded-lg ${
                              response.isAdmin
                                ? 'bg-yellow-900/20 border border-yellow-800/30'
                                : 'bg-black/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={response.isAdmin ? 'bg-yellow-900/30 text-yellow-500' : 'bg-gray-900/30 text-gray-500'}>
                                {response.isAdmin ? 'Suporte' : 'Você'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(response.createdAt).toLocaleString('pt-BR')}
                              </span>
                            </div>
                            <p className="text-gray-300">{response.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-yellow-950/20 border-yellow-900/30 p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Tempo de Resposta</h3>
                  <p className="text-gray-400">
                    Nossa equipe responde tickets em até 24 horas. Para urgências, entre em contato via chat ao vivo.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-yellow-950/20 border-yellow-900/30 p-6">
              <div className="flex items-start gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Chat ao Vivo</h3>
                  <p className="text-gray-400">
                    Para dúvidas rápidas, utilize nosso chat ao vivo disponível 24/7 no canto inferior direito.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupportPage() {
  return (
    <AuthProvider>
      <SupportContent />
    </AuthProvider>
  );
}