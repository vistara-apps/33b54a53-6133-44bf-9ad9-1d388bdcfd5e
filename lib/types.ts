export interface User {
  telegramId: string;
  username: string;
  walletAddress: string;
  ownedPets: Pet[];
  inventory: Item[];
}

export interface Pet {
  petId: string;
  ownerId: string;
  name: string;
  breed: string;
  attributes: {
    happiness: number;
    hunger: number;
    energy: number;
    cleanliness: number;
  };
  cosmetics: string[];
  evolutionLevel: number;
  lastCareTimestamp: Date;
  personality: string;
  color: string;
}

export interface Item {
  itemId: string;
  itemName: string;
  itemType: 'food' | 'toy' | 'cosmetic' | 'boost';
  cosmeticDetails?: {
    color: string;
    pattern: string;
  };
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Challenge {
  challengeId: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: string[];
  winner?: string;
  type: 'beauty' | 'care' | 'activity' | 'community';
  rewards: Item[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'pet' | 'system';
  message: string;
  timestamp: Date;
  petId?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  petId: string;
  petName: string;
  content: string;
  imageUrl?: string;
  likes: number;
  timestamp: Date;
  type: 'achievement' | 'photo' | 'milestone';
}
