'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Header from '@/components/Header';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { GAME_RANKS, GAME_NAMES, URGENCY_MULTIPLIERS, URGENCY_LABELS } from '@/lib/game-data';
import { Game, BoostOrder } from '@/lib/types';
import { saveOrder, generateId } from '@/lib/storage';
import { toast } from 'sonner';
import Link from 'next/link';

function BoostingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  
  const [selectedGame, setSelectedGame] = useState<Game | ''>('');
  const [currentRank, setCurrentRank] = useState('');
  const [desiredRank, setDesiredRank] = useState('');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState<'normal' | 'fast' | 'express'>('normal');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  useEffect(() => {
    const gameParam = searchParams.get('game');
    if (gameParam && gameParam in GAME_RANKS) {
      setSelectedGame(gameParam as Game);
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedGame && currentRank && desiredRank) {
      const ranks = GAME_RANKS[selectedGame];
      const currentIndex = ranks.findIndex(r => r.id === currentRank);
      const desiredIndex = ranks.findIndex(r => r.id === desiredRank);

      if (currentIndex !== -1 && desiredIndex !== -1 && desiredIndex > currentIndex) {
        let totalPrice = 0;
        for (let i = currentIndex; i < desiredIndex; i++) {
          totalPrice += ranks[i].price;
        }
        totalPrice *= URGENCY_MULTIPLIERS[urgency];
        setCalculatedPrice(Math.round(totalPrice));
      } else {
        setCalculatedPrice(0);
      }
    }
  }, [selectedGame, currentRank, desiredRank, urgency]);

  const handleSubmitOrder = () => {
    if (!isAuthenticated || !user) {
      toast.error('Você precisa estar logado para criar um pedido');
      router.push('/login');
      return;
    }

    if (!selectedGame || !currentRank || !desiredRank || !budget) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const order: BoostOrder = {
      id: generateId(),
      userId: user.id,
      game: selectedGame,
      currentRank,
      desiredRank,
      budget: parseFloat(budget),
      urgency,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    saveOrder(order);
    toast.success('Pedido criado com sucesso!');
    router.push('/orders');
  };

  const currentRankOptions = selectedGame ? GAME_RANKS[selectedGame] : [];
  const desiredRankOptions = selectedGame && currentRank
    ? GAME_RANKS[selectedGame].filter((_, index) => 
        index > GAME_RANKS[selectedGame].findIndex(r => r.id === currentRank)
      )
    : [];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-red-500 mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Voltar ao Marketplace
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Serviços de <span className="text-red-500">Boosting</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Selecione seu jogo, ranks e receba um orçamento instantâneo
            </p>
          </div>

          <Card className="bg-red-950/20 border-red-900/30 p-6 md:p-8">
            <div className="space-y-6">
              {/* Game Selection */}
              <div>
                <Label htmlFor="game" className="text-white text-lg mb-2 block">
                  Selecione o Jogo
                </Label>
                <Select value={selectedGame} onValueChange={(value) => {
                  setSelectedGame(value as Game);
                  setCurrentRank('');
                  setDesiredRank('');
                }}>
                  <SelectTrigger className="bg-black border-red-900/30 text-white h-12">
                    <SelectValue placeholder="Escolha um jogo" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-red-900/30">
                    {Object.entries(GAME_NAMES).map(([gameId, gameName]) => (
                      <SelectItem key={gameId} value={gameId} className="text-white">
                        {gameName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedGame && (
                <>
                  {/* Current Rank */}
                  <div>
                    <Label htmlFor="current-rank" className="text-white text-lg mb-2 block">
                      Rank Atual
                    </Label>
                    <Select value={currentRank} onValueChange={setCurrentRank}>
                      <SelectTrigger className="bg-black border-red-900/30 text-white h-12">
                        <SelectValue placeholder="Selecione seu rank atual" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-red-900/30">
                        {currentRankOptions.map((rank) => (
                          <SelectItem key={rank.id} value={rank.id} className="text-white">
                            {rank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Desired Rank */}
                  {currentRank && (
                    <div>
                      <Label htmlFor="desired-rank" className="text-white text-lg mb-2 block">
                        Rank Desejado
                      </Label>
                      <Select value={desiredRank} onValueChange={setDesiredRank}>
                        <SelectTrigger className="bg-black border-red-900/30 text-white h-12">
                          <SelectValue placeholder="Selecione o rank desejado" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-red-900/30">
                          {desiredRankOptions.map((rank) => (
                            <SelectItem key={rank.id} value={rank.id} className="text-white">
                              {rank.name} - ${rank.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Urgency */}
                  {desiredRank && (
                    <div>
                      <Label className="text-white text-lg mb-3 block">
                        Urgência do Pedido
                      </Label>
                      <RadioGroup value={urgency} onValueChange={(value: any) => setUrgency(value)}>
                        <div className="space-y-3">
                          {Object.entries(URGENCY_LABELS).map(([key, label]) => (
                            <div key={key} className="flex items-center space-x-3 bg-black/50 p-4 rounded-lg border border-red-900/20 hover:border-red-700/50 transition-colors">
                              <RadioGroupItem value={key} id={key} className="border-red-500 text-red-500" />
                              <Label htmlFor={key} className="text-white cursor-pointer flex-1">
                                {label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Budget */}
                  {desiredRank && (
                    <div>
                      <Label htmlFor="budget" className="text-white text-lg mb-2 block">
                        Seu Orçamento (USD)
                      </Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="Ex: 100"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="bg-black border-red-900/30 text-white h-12"
                      />
                    </div>
                  )}

                  {/* Price Summary */}
                  {calculatedPrice > 0 && (
                    <Card className="bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-700/50 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-300">
                            <TrendingUp className="w-5 h-5 text-red-500" />
                            <span>Progresso de Rank</span>
                          </div>
                          <span className="text-white font-semibold">
                            {GAME_RANKS[selectedGame].find(r => r.id === currentRank)?.name} → {GAME_RANKS[selectedGame].find(r => r.id === desiredRank)?.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-5 h-5 text-red-500" />
                            <span>Tempo Estimado</span>
                          </div>
                          <span className="text-white font-semibold">
                            {urgency === 'normal' ? '7-10 dias' : urgency === 'fast' ? '3-5 dias' : '1-2 dias'}
                          </span>
                        </div>

                        <div className="border-t border-red-800/30 pt-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-6 h-6 text-red-500" />
                              <span className="text-xl text-white font-bold">Preço Total</span>
                            </div>
                            <span className="text-3xl text-red-500 font-bold">
                              ${calculatedPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* Submit Button */}
                  {calculatedPrice > 0 && budget && (
                    <Button
                      onClick={handleSubmitOrder}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-14 text-lg font-semibold"
                    >
                      Criar Pedido de Boosting
                    </Button>
                  )}
                </>
              )}
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-red-950/20 border-red-900/30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Como Funciona?</h3>
              <ul className="space-y-2 text-gray-400">
                <li>1. Selecione seu jogo e ranks</li>
                <li>2. Escolha a urgência do pedido</li>
                <li>3. Defina seu orçamento</li>
                <li>4. Aguarde um booster aceitar</li>
                <li>5. Acompanhe o progresso em tempo real</li>
              </ul>
            </Card>

            <Card className="bg-red-950/20 border-red-900/30 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Quer se Tornar um Booster?</h3>
              <p className="text-gray-400 mb-4">
                Ganhe dinheiro jogando! Entre em contato com nosso suporte para se candidatar.
              </p>
              <Link href="/support">
                <Button variant="outline" className="w-full border-red-800 text-red-500 hover:bg-red-900/20">
                  Contatar Suporte
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BoostingPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Carregando...</div></div>}>
        <BoostingContent />
      </Suspense>
    </AuthProvider>
  );
}