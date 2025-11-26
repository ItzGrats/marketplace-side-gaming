'use client';

import { useState } from 'react';
import { Search, Filter, Play, Star, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Casino() {
  const [searchQuery, setSearchQuery] = useState('');

  const casinoCategories = [
    { name: 'Ao Vivo', icon: '🎥', games: 45, popular: true },
    { name: 'Slots', icon: '🎰', games: 200, popular: true },
    { name: 'Mesa', icon: '🃏', games: 25, popular: false },
    { name: 'Vídeo Poker', icon: '🃏', games: 15, popular: false },
    { name: 'Scratch Cards', icon: '🎫', games: 30, popular: false },
    { name: 'Jackpots', icon: '💰', games: 12, popular: true },
  ];

  const featuredGames = [
    {
      id: 1,
      name: 'Lightning Roulette',
      provider: 'Evolution Gaming',
      category: 'Ao Vivo',
      rtp: '97.3%',
      image: '/images/lightning-roulette.jpg',
      popular: true,
      new: false
    },
    {
      id: 2,
      name: 'Book of Dead',
      provider: 'Play\'n GO',
      category: 'Slots',
      rtp: '96.2%',
      image: '/images/book-of-dead.jpg',
      popular: true,
      new: false
    },
    {
      id: 3,
      name: 'Sweet Bonanza',
      provider: 'Pragmatic Play',
      category: 'Slots',
      rtp: '96.5%',
      image: '/images/sweet-bonanza.jpg',
      popular: true,
      new: true
    },
    {
      id: 4,
      name: 'Blackjack VIP',
      provider: 'Evolution Gaming',
      category: 'Ao Vivo',
      rtp: '99.6%',
      image: '/images/blackjack-vip.jpg',
      popular: false,
      new: false
    },
    {
      id: 5,
      name: 'Gonzo\'s Quest',
      provider: 'NetEnt',
      category: 'Slots',
      rtp: '96.0%',
      image: '/images/gonzos-quest.jpg',
      popular: true,
      new: false
    },
    {
      id: 6,
      name: 'Mega Ball',
      provider: 'Pragmatic Play',
      category: 'Ao Vivo',
      rtp: '95.8%',
      image: '/images/mega-ball.jpg',
      popular: false,
      new: true
    },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Cassino Online</h1>
            <p className="text-gray-400 text-lg">Jogue nos melhores jogos de cassino com dealers ao vivo</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar jogos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {/* Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {casinoCategories.map((category, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 p-4 hover:border-yellow-500/50 transition-all cursor-pointer group">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{category.name}</h3>
                    <div className="text-sm text-gray-400">
                      {category.games} jogos
                    </div>
                    {category.popular && (
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Games */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Jogos em Destaque</h2>
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                Ver Todos
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game) => (
                <Card key={game.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-yellow-500/50 transition-all cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-yellow-500/20 to-gray-800 flex items-center justify-center relative">
                    <Play className="w-12 h-12 text-yellow-500 group-hover:scale-110 transition-transform" />
                    {game.new && (
                      <div className="absolute top-2 right-2 bg-green-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                        NOVO
                      </div>
                    )}
                    {game.popular && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">
                        <Star className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold">{game.name}</h3>
                      <span className="text-yellow-500 text-sm">{game.category}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{game.provider}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">RTP: {game.rtp}</span>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Users className="w-3 h-3" />
                        1.2k jogando
                      </div>
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Jogar Agora
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Jackpots */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Jackpots Progressivos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-white mb-2">Mega Moolah</h3>
                  <div className="text-3xl font-bold text-yellow-500 mb-4">
                    R$ 12.450.678
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Jogar
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">💎</div>
                  <h3 className="text-xl font-bold text-white mb-2">Divine Fortune</h3>
                  <div className="text-3xl font-bold text-yellow-500 mb-4">
                    R$ 8.932.145
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Jogar
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 p-6">
                <div className="text-center">
                  <div className="text-3xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-2">Hall of Gods</h3>
                  <div className="text-3xl font-bold text-yellow-500 mb-4">
                    R$ 6.789.234
                  </div>
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    Jogar
                  </Button>
                </div>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
}