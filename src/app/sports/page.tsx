'use client';

import { useState } from 'react';
import { Search, Filter, TrendingUp, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Sports() {
  const [searchQuery, setSearchQuery] = useState('');

  const sportsCategories = [
    { name: 'Futebol', icon: '⚽', events: 45, live: 12 },
    { name: 'Basquete', icon: '🏀', events: 23, live: 5 },
    { name: 'Tênis', icon: '🎾', events: 18, live: 8 },
    { name: 'Vôlei', icon: '🏐', events: 12, live: 3 },
    { name: 'Fórmula 1', icon: '🏎️', events: 8, live: 2 },
    { name: 'eSports', icon: '🎮', events: 67, live: 15 },
  ];

  const liveEvents = [
    {
      id: 1,
      sport: 'Futebol',
      teams: 'Brasil vs Argentina',
      time: '45\'',
      score: '1-0',
      odds: { home: 2.10, draw: 3.20, away: 3.50 }
    },
    {
      id: 2,
      sport: 'Basquete',
      teams: 'Lakers vs Warriors',
      time: 'Q4 8:32',
      score: '98-95',
      odds: { home: 1.85, away: 4.20 }
    },
    {
      id: 3,
      sport: 'Tênis',
      teams: 'Djokovic vs Nadal',
      time: 'Set 2',
      score: '6-4, 3-2',
      odds: { player1: 1.45, player2: 2.80 }
    },
  ];

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Apostas Esportivas</h1>
            <p className="text-gray-400 text-lg">Encontre as melhores odds para seus esportes favoritos</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar eventos..."
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

          {/* Sports Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Esportes Disponíveis</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sportsCategories.map((sport, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 p-4 hover:border-yellow-500/50 transition-all cursor-pointer group">
                  <div className="text-center">
                    <div className="text-3xl mb-2">{sport.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{sport.name}</h3>
                    <div className="text-sm text-gray-400">
                      <div>{sport.events} eventos</div>
                      <div className="text-red-400">{sport.live} ao vivo</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Live Events */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-white">Eventos Ao Vivo</h2>
            </div>

            <div className="space-y-4">
              {liveEvents.map((event) => (
                <Card key={event.id} className="bg-gray-800/50 border-gray-700 p-6 hover:border-yellow-500/50 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-yellow-500 font-medium">{event.sport}</span>
                        <div className="flex items-center gap-1 text-red-400 text-sm">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.teams}</h3>
                      <div className="text-lg font-semibold text-yellow-500">{event.score}</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Object.entries(event.odds).map(([key, value]) => (
                        <Button
                          key={key}
                          variant="outline"
                          className="border-gray-600 text-white hover:border-yellow-500 hover:text-yellow-500 min-w-[60px]"
                        >
                          {key === 'home' ? '1' : key === 'draw' ? 'X' : key === 'away' ? '2' : key === 'player1' ? '1' : '2'}
                          <br />
                          <span className="text-yellow-500 font-bold">{value}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Popular Bets */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Apostas Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-bold text-white">Brasileirão Série A</h3>
                </div>
                <p className="text-gray-400 mb-4">Aposte nos jogos do Campeonato Brasileiro</p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Ver Jogos
                </Button>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-lg font-bold text-white">Champions League</h3>
                </div>
                <p className="text-gray-400 mb-4">Os melhores times da Europa</p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Ver Jogos
                </Button>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-bold text-white">NBA</h3>
                </div>
                <p className="text-gray-400 mb-4">Basquete americano profissional</p>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  Ver Jogos
                </Button>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
}