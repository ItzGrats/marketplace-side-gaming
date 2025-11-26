// Types para o marketplace Side Gaming

export type Game = 'rocket-league' | 'csgo' | 'valorant' | 'fortnite' | 'lol' | 'apex';

export interface Rank {
  id: string;
  name: string;
  price: number;
}

export interface GameRanks {
  [key: string]: Rank[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  isBooster: boolean;
  createdAt: string;
}

export interface BoostOrder {
  id: string;
  userId: string;
  game: Game;
  currentRank: string;
  desiredRank: string;
  budget: number;
  urgency: 'normal' | 'fast' | 'express';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
  responses: SupportResponse[];
}

export interface SupportResponse {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}
