'use client';

import { useState } from 'react';
import { ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Item } from '../lib/types';

const DEMO_ITEMS: Item[] = [
  {
    itemId: '1',
    itemName: 'Rainbow Collar',
    itemType: 'cosmetic',
    cosmeticDetails: { color: 'rainbow', pattern: 'striped' },
    price: 50,
    rarity: 'rare'
  },
  {
    itemId: '2',
    itemName: 'Premium Pet Food',
    itemType: 'food',
    price: 25,
    rarity: 'common'
  },
  {
    itemId: '3',
    itemName: 'Golden Crown',
    itemType: 'cosmetic',
    cosmeticDetails: { color: 'gold', pattern: 'royal' },
    price: 200,
    rarity: 'legendary'
  },
  {
    itemId: '4',
    itemName: 'Energy Boost',
    itemType: 'boost',
    price: 30,
    rarity: 'common'
  },
  {
    itemId: '5',
    itemName: 'Magical Toy',
    itemType: 'toy',
    price: 75,
    rarity: 'epic'
  },
  {
    itemId: '6',
    itemName: 'Sparkle Wings',
    itemType: 'cosmetic',
    cosmeticDetails: { color: 'iridescent', pattern: 'wings' },
    price: 150,
    rarity: 'epic'
  }
];

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetic' | 'food' | 'toy' | 'boost'>('all');
  const [userCoins, setUserCoins] = useState(500);

  const categories = [
    { id: 'all', label: 'All Items', icon: '🛍️' },
    { id: 'cosmetic', label: 'Cosmetics', icon: '👑' },
    { id: 'food', label: 'Food', icon: '🍖' },
    { id: 'toy', label: 'Toys', icon: '🎾' },
    { id: 'boost', label: 'Boosts', icon: '⚡' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? DEMO_ITEMS 
    : DEMO_ITEMS.filter(item => item.itemType === selectedCategory);

  const getRarityColor = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50';
      case 'rare':
        return 'border-blue-300 bg-blue-50';
      case 'epic':
        return 'border-purple-300 bg-purple-50';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: Item['rarity']) => {
    const colors = {
      common: 'bg-gray-100 text-gray-800',
      rare: 'bg-blue-100 text-blue-800',
      epic: 'bg-purple-100 text-purple-800',
      legendary: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${colors[rarity]}`}>
        <Star size={12} />
        {rarity}
      </span>
    );
  };

  const getItemEmoji = (item: Item) => {
    switch (item.itemType) {
      case 'cosmetic':
        if (item.itemName.includes('Crown')) return '👑';
        if (item.itemName.includes('Collar')) return '🎀';
        if (item.itemName.includes('Wings')) return '🦋';
        return '✨';
      case 'food':
        return '🍖';
      case 'toy':
        return '🎾';
      case 'boost':
        return '⚡';
      default:
        return '🎁';
    }
  };

  const handlePurchase = (item: Item) => {
    if (userCoins >= item.price) {
      setUserCoins(userCoins - item.price);
      // In a real app, this would add the item to the user's inventory
      alert(`Successfully purchased ${item.itemName}!`);
    } else {
      alert('Not enough coins!');
    }
  };

  return (
    <div className="space-y-4">
      {/* Marketplace Header */}
      <div className="pet-card text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShoppingBag className="text-primary" size={24} />
          <h2 className="text-xl font-bold text-gray-900">Marketplace</h2>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Customize your pets with amazing items!
        </p>
        
        {/* User Coins */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
          <span className="text-lg">🪙</span>
          <span className="font-bold">{userCoins} Coins</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.itemId}
            className={`pet-card ${getRarityColor(item.rarity)} border-2`}
          >
            {/* Item Image/Emoji */}
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">
                {getItemEmoji(item)}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {item.itemName}
              </h3>
              {getRarityBadge(item.rarity)}
            </div>

            {/* Item Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Price:</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">🪙</span>
                  <span className="font-bold text-sm">{item.price}</span>
                </div>
              </div>
              
              {item.cosmeticDetails && (
                <div className="text-xs text-gray-600">
                  <span className="capitalize">{item.cosmeticDetails.color}</span>
                  {item.cosmeticDetails.pattern && (
                    <span> • {item.cosmeticDetails.pattern}</span>
                  )}
                </div>
              )}
            </div>

            {/* Purchase Button */}
            <button
              onClick={() => handlePurchase(item)}
              disabled={userCoins < item.price}
              className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                userCoins >= item.price
                  ? 'bg-primary text-white hover:bg-primary/90 active:scale-95'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {userCoins >= item.price ? 'Buy Now' : 'Not Enough Coins'}
            </button>
          </div>
        ))}
      </div>

      {/* Special Offers */}
      <div className="pet-card bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={20} />
          <h3 className="font-bold">Daily Special</h3>
        </div>
        <p className="text-sm mb-3 opacity-90">
          Get 20% off all cosmetic items today only!
        </p>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
          Shop Cosmetics
        </button>
      </div>
    </div>
  );
}
