'use client';

import { useState } from 'react';
import { Play, Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Live() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos', count: 89 },
    { id: 'football', name: 'Futebol', count: 32 },
    { id: 'basketball', name: 'Basquete', count: 15 },
    { id: 'tennis', name: 'Tênis', count: 18 },
    { id: 'volleyball', name: 'Vôlei', count: 8 },
    { id: 'casino', name: 'Cassino', count: 16 },
  ];

  const liveEvents = [
    {
      id: 1,
      sport: 'Futebol',
      category: 'football',
      league: 'Brasileirão Série A',
      teams: 'Flamengo vs Palmeiras',
      time: '67\'',
      score: '2-1',
      viewers: 15420,
      odds: { home: 2.15, draw: 3.10, away: 3.40 },
      featured: true
    },
    {
      id: 2,
      sport: 'Basquete',
      category: 'basketball',
      league: 'NBA',
      teams: 'Lakers vs Celtics',
      time: 'Q3 5:23',
      score: '87-82',
      viewers: 8920,
      odds: { home: 1.75, away: 2.05 },
      featured: false
    },
    {
      id: 3,
      sport: 'Tênis',
      category: 'tennis',
      league: 'ATP Masters 1000',
      teams: 'Carlos Alcaraz vs Novak Djokovic',
      time: 'Set 2 4-2',
      score: '6-3, 4-2',
      viewers: 5670,
      odds: { player1: 1.45, player2: 2.80 },
      featured: false
    },
    {
      id: 4,
      sport: 'Cassino',
      category: 'casino',
      league: 'Roleta Ao Vivo',
      teams: 'Lightning Roulette',
      time: 'Ao Vivo',
      score: 'Rodando...',
      viewers: 12340,
      odds: { red: 2.00, black: 2.00, green: 36.00 },
      featured: true
    },
    {
      id: 5,
      sport: 'Futebol',
      category: 'football',
      league: 'Premier League',
      teams: 'Manchester City vs Arsenal',
      time: '23\'',
      score: '0-0',
      viewers: 18750,
      odds: { home: 1.85, draw: 3.60, away: 4.20 },
      featured: true
    },
    {
      id: 6,
      sport: 'Vôlei',
      category: 'volleyball',
      league: 'Superliga Masculina',
      teams: 'Sada Cruzeiro vs Minas Tênis',
      time: 'Set 3 18-16',
      score: '25-23, 22-25, 18-16',
      viewers: 3240,
      odds: { home: 1.60, away: 2.30 },
      featured: false
    },
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? liveEvents 
    : liveEvents.filter(event => event.category === selectedCategory);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Ao Vivo</h1>
            <p className="text-gray-400 text-lg">Assista e aposte em eventos esportivos e jogos de cassino ao vivo</p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-yellow-500 text-black hover:bg-yellow-600"
                    : "border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>

          {/* Featured Events */}
          {filteredEvents.filter(event => event.featured).length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">Eventos em Destaque</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.filter(event => event.featured).map((event) => (
                  <Card key={event.id} className="bg-gradient-to-br from-yellow-500/10 to-gray-800/50 border-yellow-500/30 p-6 hover:border-yellow-500/50 transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-yellow-500 font-medium">{event.sport} • {event.league}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{event.teams}</h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-500 mb-1">{event.score}</div>
                        <div className="text-sm text-gray-400">{event.time}</div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Eye className="w-4 h-4" />
                        {event.viewers.toLocaleString()} assistindo
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(event.odds).map(([key, value]) => (
                        <Button
                          key={key}
                          variant="outline"
                          className="border-gray-600 text-white hover:border-yellow-500 hover:text-yellow-500 min-w-[60px]"
                        >
                          {key === 'home' ? '1' : key === 'draw' ? 'X' : key === 'away' ? '2' : key === 'player1' ? '1' : key === 'player2' ? '2' : key === 'red' ? 'Verm.' : key === 'black' ? 'Pret.' : 'Verde'}
                          <br />
                          <span className="text-yellow-500 font-bold">{value}</span>
                        </Button>
                      ))}
                    </div>

                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir Agora
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* All Live Events */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Todos os Eventos Ao Vivo</h2>
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="bg-gray-800/50 border-gray-700 p-6 hover:border-yellow-500/50 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-yellow-500 font-medium">{event.sport} • {event.league}</span>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Eye className="w-3 h-3" />
                          {event.viewers.toLocaleString()}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.teams}</h3>
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-semibold text-yellow-500">{event.score}</div>
                        <div className="text-sm text-gray-400">{event.time}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {Object.entries(event.odds).map(([key, value]) => (
                        <Button
                          key={key}
                          variant="outline"
                          className="border-gray-600 text-white hover:border-yellow-500 hover:text-yellow-500 min-w-[60px]"
                        >
                          {key === 'home' ? '1' : key === 'draw' ? 'X' : key === 'away' ? '2' : key === 'player1' ? '1' : key === 'player2' ? '2' : key === 'red' ? 'V' : key === 'black' ? 'P' : '0'}
                          <br />
                          <span className="text-yellow-500 font-bold">{value}</span>
                        </Button>
                      ))}
                    </div>

                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      <Play className="w-4 h-4 mr-2" />
                      Ver
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AuthProvider>
  );
}