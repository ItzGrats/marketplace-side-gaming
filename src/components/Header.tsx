'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, LogOut, Wallet, Headphones, Trophy, Gamepad2, Zap, Gift } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-black border-b border-yellow-500/30 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex items-center gap-3 group">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              ELDORADO
            </div>
            <Trophy className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/sports" 
              prefetch={false}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
            >
              <Trophy className="w-4 h-4" />
              Esportes
            </Link>
            <Link 
              href="/casino" 
              prefetch={false}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
            >
              <Gamepad2 className="w-4 h-4" />
              Cassino
            </Link>
            <Link 
              href="/live" 
              prefetch={false}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
            >
              <Zap className="w-4 h-4" />
              Ao Vivo
            </Link>
            <Link 
              href="/promotions" 
              prefetch={false}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
            >
              <Gift className="w-4 h-4" />
              Promoções
            </Link>
            <Link 
              href="/support" 
              prefetch={false}
              className="text-gray-300 hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
            >
              <Headphones className="w-4 h-4" />
              Suporte
            </Link>
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <Wallet className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-white">R$ 1.250,00</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700">
                  <User className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-white">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-400 hover:text-yellow-500"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" prefetch={false}>
                  <Button variant="ghost" className="text-gray-300 hover:text-yellow-500">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register" prefetch={false}>
                  <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-yellow-500/20 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-500/30">
            <nav className="flex flex-col gap-3">
              <Link 
                href="/sports" 
                prefetch={false}
                className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Trophy className="w-4 h-4" />
                Esportes
              </Link>
              <Link 
                href="/casino" 
                prefetch={false}
                className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Gamepad2 className="w-4 h-4" />
                Cassino
              </Link>
              <Link 
                href="/live" 
                prefetch={false}
                className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Zap className="w-4 h-4" />
                Ao Vivo
              </Link>
              <Link 
                href="/promotions" 
                prefetch={false}
                className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Gift className="w-4 h-4" />
                Promoções
              </Link>
              <Link 
                href="/support" 
                prefetch={false}
                className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Headphones className="w-4 h-4" />
                Suporte
              </Link>
              
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <Wallet className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-white">Saldo: R$ 1.250,00</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                    <User className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-white">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-yellow-500 transition-colors py-2 px-3 rounded-lg hover:bg-yellow-500/10 flex items-center gap-2 text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link href="/login" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/register" prefetch={false} onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}