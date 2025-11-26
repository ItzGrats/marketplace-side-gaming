// Funções utilitárias para Local Storage
import { User, BoostOrder, SupportTicket } from './types';

// User Management
export const saveUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('side-gaming-user', JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('side-gaming-user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const removeUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('side-gaming-user');
  }
};

// Orders Management
export const saveOrder = (order: BoostOrder): void => {
  if (typeof window !== 'undefined') {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem('side-gaming-orders', JSON.stringify(orders));
  }
};

export const getOrders = (): BoostOrder[] => {
  if (typeof window !== 'undefined') {
    const orders = localStorage.getItem('side-gaming-orders');
    return orders ? JSON.parse(orders) : [];
  }
  return [];
};

export const getUserOrders = (userId: string): BoostOrder[] => {
  return getOrders().filter(order => order.userId === userId);
};

// Support Tickets Management
export const saveTicket = (ticket: SupportTicket): void => {
  if (typeof window !== 'undefined') {
    const tickets = getTickets();
    tickets.push(ticket);
    localStorage.setItem('side-gaming-tickets', JSON.stringify(tickets));
  }
};

export const getTickets = (): SupportTicket[] => {
  if (typeof window !== 'undefined') {
    const tickets = localStorage.getItem('side-gaming-tickets');
    return tickets ? JSON.parse(tickets) : [];
  }
  return [];
};

export const getUserTickets = (userId: string): SupportTicket[] => {
  return getTickets().filter(ticket => ticket.userId === userId);
};

// Navigation History
export const saveNavigationHistory = (path: string): void => {
  if (typeof window !== 'undefined') {
    const history = getNavigationHistory();
    history.push({ path, timestamp: new Date().toISOString() });
    // Keep only last 50 entries
    const trimmedHistory = history.slice(-50);
    localStorage.setItem('side-gaming-nav-history', JSON.stringify(trimmedHistory));
  }
};

export const getNavigationHistory = (): Array<{ path: string; timestamp: string }> => {
  if (typeof window !== 'undefined') {
    const history = localStorage.getItem('side-gaming-nav-history');
    return history ? JSON.parse(history) : [];
  }
  return [];
};

// Preferences
export const savePreference = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    const prefs = getPreferences();
    prefs[key] = value;
    localStorage.setItem('side-gaming-preferences', JSON.stringify(prefs));
  }
};

export const getPreferences = (): Record<string, any> => {
  if (typeof window !== 'undefined') {
    const prefs = localStorage.getItem('side-gaming-preferences');
    return prefs ? JSON.parse(prefs) : {};
  }
  return {};
};

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
