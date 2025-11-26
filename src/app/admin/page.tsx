'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, UserCheck, UserX, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';
import Link from 'next/link';

type Profile = Database['public']['Tables']['profiles']['Row'];

function AdminContent() {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      loadUsers();
    } else {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Erro ao carregar usuários');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    setUpdatingUser(userId);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u =>
        u.id === userId ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
      setError('Erro ao atualizar papel do usuário');
    } finally {
      setUpdatingUser(null);
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      user: { label: 'Usuário', className: 'bg-gray-900/30 text-gray-400 border-gray-800' },
      booster: { label: 'Booster', className: 'bg-blue-900/30 text-blue-400 border-blue-800' },
      admin: { label: 'Admin', className: 'bg-red-900/30 text-red-400 border-red-800' },
    };

    const variant = variants[role as keyof typeof variants] || variants.user;

    return (
      <Badge className={`${variant.className} flex items-center gap-1`}>
        {role === 'admin' && <Shield className="w-3 h-3" />}
        {role === 'booster' && <UserCheck className="w-3 h-3" />}
        {role === 'user' && <UserX className="w-3 h-3" />}
        {variant.label}
      </Badge>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-red-950/20 border-red-900/30 p-12 text-center">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
              <p className="text-gray-400 mb-6">
                Você precisa estar logado como administrador para acessar esta página
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

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-black">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-red-950/20 border-red-900/30 p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Acesso Negado</h2>
              <p className="text-gray-400 mb-6">
                Você não tem permissão para acessar o painel administrativo
              </p>
              <Link href="/">
                <Button variant="outline" className="border-red-800 text-red-500 hover:bg-red-900/20">
                  Voltar ao Marketplace
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

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-white">Painel Administrativo</h1>
          </div>

          {error && (
            <Alert className="border-red-800 bg-red-900/20 mb-6">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-red-950/20 border-red-900/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">Total de Usuários</h3>
              </div>
              <p className="text-3xl font-bold text-red-500">{users.length}</p>
            </Card>

            <Card className="bg-red-950/20 border-red-900/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-bold text-white">Boosters</h3>
              </div>
              <p className="text-3xl font-bold text-blue-500">
                {users.filter(u => u.role === 'booster').length}
              </p>
            </Card>

            <Card className="bg-red-950/20 border-red-900/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-white">Administradores</h3>
              </div>
              <p className="text-3xl font-bold text-red-500">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </Card>
          </div>

          <Card className="bg-red-950/20 border-red-900/30 p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Usuários</h2>

            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-red-900/20">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      {getRoleBadge(user.role)}
                    </div>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs">
                      Criado em {new Date(user.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={user.role}
                      onValueChange={(value) => updateUserRole(user.id, value)}
                      disabled={updatingUser === user.id}
                    >
                      <SelectTrigger className="w-32 bg-red-950/20 border-red-900/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-red-950 border-red-900">
                        <SelectItem value="user" className="text-white hover:bg-red-900/20">Usuário</SelectItem>
                        <SelectItem value="booster" className="text-white hover:bg-red-900/20">Booster</SelectItem>
                        <SelectItem value="admin" className="text-white hover:bg-red-900/20">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  );
}