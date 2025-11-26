'use client';

import { useState } from 'react';
import { Search, TrendingUp, Shield, Zap, Star, ChevronRight, Play, Trophy, Users, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const sports = [
    { name: 'Futebol', icon: '⚽', live: true },
    { name: 'Basquete', icon: '🏀', live: false },
    { name: 'Tênis', icon: '🎾', live: true },
    { name: 'Vôlei', icon: '🏐', live: false },
    { name: 'Fórmula 1', icon: '🏎️', live: true },
    { name: 'eSports', icon: '🎮', live: true },
  ];

  const casinoGames = [
    { name: 'Roleta', image: '/images/roulette.jpg', category: 'Ao Vivo' },
    { name: 'Blackjack', image: '/images/blackjack.jpg', category: 'Ao Vivo' },
    { name: 'Baccarat', image: '/images/baccarat.jpg', category: 'Ao Vivo' },
    { name: 'Slots', image: '/images/slots.jpg', category: 'Máquinas' },
    { name: 'Poker', image: '/images/poker.jpg', category: 'Mesa' },
    { name: 'Dados', image: '/images/dice.jpg', category: 'Ao Vivo' },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-black pointer-events-none" />
          <div className="container mx-auto px-4 py-20 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
                <span className="text-yellow-400 font-semibold text-sm">🏆 O Maior Site de Apostas do Brasil</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Bem-vindo ao
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"> Eldorado</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                A casa mais confiável para apostas esportivas e jogos de cassino online. 
                Diversão garantida com os melhores odds do mercado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" prefetch={false}>
                  <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg px-8 py-6">
                    Cadastre-se Agora
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login" prefetch={false}>
                  <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-lg px-8 py-6">
                    Fazer Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Section */}
        <section className="py-16 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Apostas Esportivas</h2>
              <p className="text-gray-400 text-lg">Aposte nos seus esportes favoritos com os melhores odds</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sports.map((sport, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 p-4 hover:border-yellow-500/50 transition-all cursor-pointer group">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{sport.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{sport.name}</h3>
                    {sport.live && (
                      <span className="inline-block px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                        AO VIVO
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Casino Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Cassino Online</h2>
              <p className="text-gray-400 text-lg">Jogos de cassino ao vivo e máquinas caça-níqueis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {casinoGames.map((game, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-yellow-500/50 transition-all cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-gray-800 flex items-center justify-center">
                    <Play className="w-12 h-12 text-yellow-500 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{game.name}</h3>
                      <span className="text-yellow-500 text-sm">{game.category}</span>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Jogar Agora
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 p-6 text-center">
                <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Licenciado</h3>
                <p className="text-gray-400 text-sm">
                  Operamos com licença internacional para sua segurança.
                </p>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 p-6 text-center">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Pagamentos Rápidos</h3>
                <p className="text-gray-400 text-sm">
                  Saques processados em até 24 horas.
                </p>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 p-6 text-center">
                <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Suporte 24/7</h3>
                <p className="text-gray-400 text-sm">
                  Atendimento ao cliente disponível 24 horas por dia.
                </p>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 p-6 text-center">
                <Gift className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bônus</h3>
                <p className="text-gray-400 text-sm">
                  Até R$ 500 de bônus no primeiro depósito.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Pronto para Apostar?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Junte-se a milhões de jogadores e comece sua jornada no Eldorado hoje mesmo.
              </p>
              <Link href="/register" prefetch={false}>
                <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg px-12 py-6">
                  Começar Agora
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-700 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-500">
              <p>&copy; 2024 Eldorado.gg. Todos os direitos reservados.</p>
              <p className="text-sm mt-2">A casa mais confiável para apostas online no Brasil.</p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}