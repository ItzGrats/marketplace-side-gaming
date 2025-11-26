'use client';

import { Gift, Star, TrendingUp, Calendar, Percent, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Promotions() {
  const promotions = [
    {
      id: 1,
      title: 'Bônus de Boas-Vindas',
      description: 'Até R$ 500 no seu primeiro depósito',
      type: 'deposit',
      bonus: '100%',
      maxBonus: 'R$ 500',
      minDeposit: 'R$ 25',
      expiry: '30 dias',
      featured: true,
      image: '/images/welcome-bonus.jpg'
    },
    {
      id: 2,
      title: 'Apostas Grátis',
      description: 'Ganhe R$ 50 em apostas grátis',
      type: 'freebet',
      bonus: 'R$ 50',
      conditions: 'Após primeira aposta',
      expiry: '7 dias',
      featured: true,
      image: '/images/free-bets.jpg'
    },
    {
      id: 3,
      title: 'Cashback Semanal',
      description: 'Até 15% de cashback nas perdas',
      type: 'cashback',
      bonus: '15%',
      maxCashback: 'R$ 200',
      conditions: 'Perdas da semana',
      expiry: 'Semanal',
      featured: false,
      image: '/images/cashback.jpg'
    },
    {
      id: 4,
      title: 'Recarga de Domingo',
      description: 'Bônus extra nos depósitos de domingo',
      type: 'weekly',
      bonus: '50%',
      maxBonus: 'R$ 300',
      minDeposit: 'R$ 50',
      expiry: 'Até segunda-feira',
      featured: false,
      image: '/images/sunday-reload.jpg'
    },
    {
      id: 5,
      title: 'Torneio de Slots',
      description: 'Concora a R$ 10.000 em prêmios',
      type: 'tournament',
      prize: 'R$ 10.000',
      entry: 'Grátis',
      endDate: '31 Dez 2024',
      featured: true,
      image: '/images/slots-tournament.jpg'
    },
    {
      id: 6,
      title: 'Programa VIP',
      description: 'Benefícios exclusivos para jogadores VIP',
      type: 'vip',
      benefits: ['Cashback 20%', 'Apostas grátis', 'Gerente pessoal'],
      minWager: 'R$ 50.000',
      featured: false,
      image: '/images/vip-program.jpg'
    },
  ];

  const featuredPromotions = promotions.filter(promo => promo.featured);
  const regularPromotions = promotions.filter(promo => !promo.featured);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Promoções</h1>
            <p className="text-gray-400 text-lg">Aproveite as melhores ofertas e bônus exclusivos</p>
          </div>

          {/* Featured Promotions */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-white">Promoções em Destaque</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPromotions.map((promo) => (
                <Card key={promo.id} className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 overflow-hidden hover:border-yellow-500/50 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-gray-800 flex items-center justify-center">
                    <Gift className="w-16 h-16 text-yellow-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-yellow-500 font-medium uppercase">{promo.type}</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-gray-400 mb-4">{promo.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {promo.bonus && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Bônus:</span>
                          <span className="text-yellow-500 font-semibold">{promo.bonus}</span>
                        </div>
                      )}
                      {promo.maxBonus && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Máximo:</span>
                          <span className="text-yellow-500 font-semibold">{promo.maxBonus}</span>
                        </div>
                      )}
                      {promo.minDeposit && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Depósito mínimo:</span>
                          <span className="text-white">{promo.minDeposit}</span>
                        </div>
                      )}
                      {promo.prize && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Prêmio total:</span>
                          <span className="text-yellow-500 font-semibold">{promo.prize}</span>
                        </div>
                      )}
                      {promo.expiry && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Expira em:</span>
                          <span className="text-white">{promo.expiry}</span>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Participar Agora
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Regular Promotions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Mais Promoções</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPromotions.map((promo) => (
                <Card key={promo.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-yellow-500/50 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    {promo.type === 'cashback' && <TrendingUp className="w-12 h-12 text-yellow-500" />}
                    {promo.type === 'weekly' && <Calendar className="w-12 h-12 text-yellow-500" />}
                    {promo.type === 'vip' && <Star className="w-12 h-12 text-yellow-500" />}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-yellow-500 font-medium uppercase">{promo.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                    <p className="text-gray-400 mb-4">{promo.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {promo.bonus && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Bônus:</span>
                          <span className="text-yellow-500 font-semibold">{promo.bonus}</span>
                        </div>
                      )}
                      {promo.maxCashback && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Máximo:</span>
                          <span className="text-yellow-500 font-semibold">{promo.maxCashback}</span>
                        </div>
                      )}
                      {promo.minWager && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Aposta mínima:</span>
                          <span className="text-white">{promo.minWager}</span>
                        </div>
                      )}
                      {promo.benefits && (
                        <div className="text-sm">
                          <span className="text-gray-400">Benefícios:</span>
                          <ul className="text-white mt-1 space-y-1">
                            {promo.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Saiba Mais
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12">
            <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 p-8 max-w-2xl mx-auto">
              <Percent className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Não Perca Nenhuma Oferta!</h2>
              <p className="text-gray-400 mb-6">
                Cadastre-se agora e receba ofertas exclusivas por e-mail
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                  <Zap className="w-5 h-5 mr-2" />
                  Cadastrar Agora
                </Button>
                <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                  Ver Todas as Promoções
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
}