'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Package, Clock, CheckCircle, XCircle, TrendingUp, Play, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { GAME_NAMES, GAME_RANKS } from '@/lib/game-data';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import Link from 'next/link';

type Order = Database['public']['Tables']['orders']['Row'] & {
  profiles?: { name: string; email: string };
};

function OrdersContent() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadOrders();
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const loadOrders = async () => {
    try {
      let query = supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (
            name,
            email
          )
        `);

      // If user is booster or admin, show all orders, otherwise only user's orders
      if (user?.role === 'user') {
        query = query.eq('user_id', user.id);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string, boosterId?: string) => {
    setUpdatingOrder(orderId);
    try {
      const updateData: any = { status };
      if (boosterId) {
        updateData.booster_id = boosterId;
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status, booster_id: boosterId || order.booster_id }
          : order
      ));
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const acceptOrder = (orderId: string) => {
    if (user) {
      updateOrderStatus(orderId, 'in-progress', user.id);
    }
  };

  const completeOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'completed');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: 'Pendente', icon: Clock, className: 'bg-yellow-900/30 text-yellow-500 border-yellow-800' },
      'in-progress': { label: 'Em Progresso', icon: TrendingUp, className: 'bg-blue-900/30 text-blue-500 border-blue-800' },
      completed: { label: 'Concluído', icon: CheckCircle, className: 'bg-green-900/30 text-green-500 border-green-800' },
      cancelled: { label: 'Cancelado', icon: XCircle, className: 'bg-red-900/30 text-red-500 border-red-800' },
    };

    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;

    return (
      <Badge className={`${variant.className} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {variant.label}
      </Badge>
    );
  };

  const getRankName = (game: string, rankId: string) => {
    const ranks = GAME_RANKS[game];
    return ranks?.find(r => r.id === rankId)?.name || rankId;
  };

  if (!isAuthenticated) {
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

          <div className="max-w-5xl mx-auto">
            <Card className="bg-red-950/20 border-red-900/30 p-12 text-center">
              <Package className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
              <p className="text-gray-400 mb-6">
                Você precisa estar logado para ver seus pedidos
              </p>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
                  Fazer Login
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-400">Carregando...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isBoosterOrAdmin = user?.role === 'booster' || user?.role === 'admin';
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const userOrders = orders.filter(order => order.user_id === user?.id);

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

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl font-bold text-white">
                {isBoosterOrAdmin ? 'Gerenciar Pedidos' : 'Meus Pedidos'}
              </h1>
            </div>

            {user?.role === 'admin' && (
              <Link href="/admin">
                <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20">
                  <Shield className="w-4 h-4 mr-2" />
                  Painel Admin
                </Button>
              </Link>
            )}
          </div>

          {isBoosterOrAdmin && pendingOrders.length > 0 && (
            <Card className="bg-red-950/20 border-red-900/30 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Pedidos Pendentes</h2>
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-red-900/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {GAME_NAMES[order.game as keyof typeof GAME_NAMES]}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-gray-400 mb-1">
                        Cliente: {order.profiles?.name} ({order.profiles?.email})
                      </p>
                      <p className="text-gray-400 text-sm">
                        {getRankName(order.game, order.current_rank)} → {getRankName(order.game, order.desired_rank)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        Criado em {new Date(order.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right mr-4">
                        <div className="text-sm text-gray-400">Orçamento</div>
                        <div className="text-xl font-bold text-red-500">${order.budget}</div>
                      </div>

                      <Button
                        onClick={() => acceptOrder(order.id)}
                        disabled={updatingOrder === order.id}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Aceitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="bg-red-950/20 border-red-900/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isBoosterOrAdmin ? 'Todos os Pedidos' : 'Meus Pedidos'}
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum pedido encontrado</h3>
                <p className="text-gray-400">
                  {isBoosterOrAdmin
                    ? 'Não há pedidos no sistema ainda'
                    : 'Você ainda não criou nenhum pedido de boosting'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 bg-black/20 rounded-lg border border-red-900/20 hover:border-red-700/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">
                            {GAME_NAMES[order.game as keyof typeof GAME_NAMES]}
                          </h3>
                          {getStatusBadge(order.status)}
                        </div>

                        {isBoosterOrAdmin && order.profiles && (
                          <p className="text-gray-400 mb-2">
                            Cliente: {order.profiles.name} ({order.profiles.email})
                          </p>
                        )}

                        <div className="space-y-2 text-gray-400">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-red-500" />
                            <span>
                              {getRankName(order.game, order.current_rank)} → {getRankName(order.game, order.desired_rank)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span>
                              Urgência: {order.urgency === 'normal' ? 'Normal' : order.urgency === 'fast' ? 'Rápido' : 'Expresso'}
                            </span>
                          </div>

                          <div className="text-sm text-gray-500">
                            Criado em {new Date(order.created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-sm text-gray-400 mb-1">Orçamento</div>
                          <div className="text-2xl font-bold text-red-500">
                            ${order.budget}
                          </div>
                        </div>

                        {isBoosterOrAdmin && order.status === 'in-progress' && order.booster_id === user?.id && (
                          <Button
                            onClick={() => completeOrder(order.id)}
                            disabled={updatingOrder === order.id}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Concluir
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <AuthProvider>
      <OrdersContent />
    </AuthProvider>
  );
}