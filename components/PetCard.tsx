'use client';

import { Pet } from '../lib/types';
import { getPetEmoji, getPetMood, getStatColor } from '../lib/petUtils';
import { Heart, Zap, Utensils, Sparkles } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function PetCard({ pet, variant = 'detailed', onClick }: PetCardProps) {
  const mood = getPetMood(pet);
  const petEmoji = getPetEmoji(pet.breed);

  if (variant === 'compact') {
    return (
      <div 
        className="pet-card cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="pet-avatar text-2xl">
            {petEmoji}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{pet.name}</h3>
            <p className="text-sm text-gray-600 capitalize">{pet.breed} • {mood}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-card">
      <div className="text-center mb-4">
        <div className="pet-avatar mx-auto mb-3 floating">
          {petEmoji}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{pet.name}</h2>
        <p className="text-gray-600 capitalize">
          {pet.personality} {pet.breed} • Level {pet.evolutionLevel}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Feeling {mood} today
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Heart size={16} className="text-red-500" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Happiness</span>
              <span>{pet.attributes.happiness}%</span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill bg-gradient-to-r ${getStatColor(pet.attributes.happiness)}`}
                style={{ width: `${pet.attributes.happiness}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Utensils size={16} className="text-orange-500" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Hunger</span>
              <span>{pet.attributes.hunger}%</span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill bg-gradient-to-r ${getStatColor(pet.attributes.hunger)}`}
                style={{ width: `${pet.attributes.hunger}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap size={16} className="text-yellow-500" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Energy</span>
              <span>{pet.attributes.energy}%</span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill bg-gradient-to-r ${getStatColor(pet.attributes.energy)}`}
                style={{ width: `${pet.attributes.energy}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Sparkles size={16} className="text-blue-500" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Cleanliness</span>
              <span>{pet.attributes.cleanliness}%</span>
            </div>
            <div className="stat-bar">
              <div 
                className={`stat-fill bg-gradient-to-r ${getStatColor(pet.attributes.cleanliness)}`}
                style={{ width: `${pet.attributes.cleanliness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cosmetics */}
      {pet.cosmetics.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">Wearing:</p>
          <div className="flex flex-wrap gap-2">
            {pet.cosmetics.map((cosmetic, index) => (
              <span 
                key={index}
                className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
              >
                {cosmetic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
