'use client';

import { Utensils, Play, Sparkles, Moon } from 'lucide-react';

interface ActionPickerProps {
  onAction: (action: string) => void;
  variant?: 'primary' | 'secondary';
}

const actions = [
  {
    id: 'feed',
    label: 'Feed',
    icon: Utensils,
    color: 'from-orange-400 to-orange-600',
    description: 'Give your pet some delicious food'
  },
  {
    id: 'play',
    label: 'Play',
    icon: Play,
    color: 'from-green-400 to-green-600',
    description: 'Have fun and play together'
  },
  {
    id: 'groom',
    label: 'Groom',
    icon: Sparkles,
    color: 'from-blue-400 to-blue-600',
    description: 'Clean and beautify your pet'
  },
  {
    id: 'sleep',
    label: 'Sleep',
    icon: Moon,
    color: 'from-purple-400 to-purple-600',
    description: 'Let your pet rest and recharge'
  }
];

export function ActionPicker({ onAction, variant = 'primary' }: ActionPickerProps) {
  return (
    <div className="pet-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        What would you like to do?
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className={`
                group relative overflow-hidden rounded-lg p-4 text-white font-medium
                bg-gradient-to-br ${action.color}
                hover:scale-105 active:scale-95 transition-all duration-200
                shadow-lg hover:shadow-xl
              `}
            >
              <div className="flex flex-col items-center gap-2">
                <Icon size={24} className="group-hover:animate-bounce" />
                <span className="text-sm">{action.label}</span>
              </div>
              
              {/* Hover tooltip */}
              <div className="absolute inset-x-0 bottom-0 bg-black/80 text-xs p-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                {action.description}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          💡 Tip: Regular care keeps your pet happy and healthy!
        </p>
      </div>
    </div>
  );
}
