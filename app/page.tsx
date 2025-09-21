'use client';

import { useState, useEffect } from 'react';
import { PetCard } from '../components/PetCard';
import { ActionPicker } from '../components/ActionPicker';
import { ChatBubble } from '../components/ChatBubble';
import { NotificationBanner } from '../components/NotificationBanner';
import { CreatePetModal } from '../components/CreatePetModal';
import { CommunityFeed } from '../components/CommunityFeed';
import { Marketplace } from '../components/Marketplace';
import { Pet, User, Challenge } from '../lib/types';
import { generatePet, updatePetStats } from '../lib/petUtils';
import { Heart, Users, ShoppingBag, Plus, Sparkles } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'pets' | 'community' | 'marketplace'>('pets');
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: 'user' | 'pet' | 'system';
    message: string;
    timestamp: Date;
  }>>([]);

  // Initialize demo user and pets
  useEffect(() => {
    const demoUser: User = {
      telegramId: 'demo123',
      username: 'PetLover',
      walletAddress: '0x1234...5678',
      ownedPets: [],
      inventory: []
    };

    // Create a demo pet
    const demoPet = generatePet('Fluffy', 'demo123');
    demoUser.ownedPets = [demoPet];
    
    setUser(demoUser);
    setSelectedPet(demoPet);

    // Add welcome message
    setChatMessages([
      {
        id: '1',
        type: 'system',
        message: 'Welcome to PixelPals Tribe! Your pet Fluffy is excited to meet you! 🐾',
        timestamp: new Date()
      }
    ]);
  }, []);

  const handlePetAction = (action: string) => {
    if (!selectedPet || !user) return;

    const updatedPet = updatePetStats(selectedPet, action);
    const updatedUser = {
      ...user,
      ownedPets: user.ownedPets.map(pet => 
        pet.petId === selectedPet.petId ? updatedPet : pet
      )
    };

    setUser(updatedUser);
    setSelectedPet(updatedPet);

    // Add chat message based on action
    const petResponses = {
      feed: `*munch munch* ${selectedPet.name} loves the food! 😋`,
      play: `${selectedPet.name} is having so much fun playing! 🎾`,
      groom: `${selectedPet.name} feels so clean and pretty now! ✨`,
      sleep: `${selectedPet.name} is taking a peaceful nap... 😴`
    };

    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'pet',
      message: petResponses[action as keyof typeof petResponses] || `${selectedPet.name} enjoyed that!`,
      timestamp: new Date()
    }]);
  };

  const handleCreatePet = (name: string, breed: string) => {
    if (!user) return;

    const newPet = generatePet(name, user.telegramId, breed);
    const updatedUser = {
      ...user,
      ownedPets: [...user.ownedPets, newPet]
    };

    setUser(updatedUser);
    setShowCreateModal(false);

    setChatMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'system',
      message: `🎉 Welcome ${name} to the PixelPals family! Your new ${breed} is ready for adventures!`,
      timestamp: new Date()
    }]);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading your PixelPals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
      {/* Floating sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            PixelPals Tribe
          </h1>
          <p className="text-white/80 text-sm">
            Your AI-powered virtual pet community
          </p>
        </div>

        {/* Notification Banner */}
        <NotificationBanner
          type="info"
          message="🎊 Community Challenge: Cutest Pet Contest ends in 2 days!"
          className="mb-4"
        />

        {/* Tab Navigation */}
        <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('pets')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'pets'
                ? 'bg-white text-primary shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Heart size={18} />
            <span className="text-sm font-medium">My Pets</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'community'
                ? 'bg-white text-primary shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-medium">Community</span>
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
              activeTab === 'marketplace'
                ? 'bg-white text-primary shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <ShoppingBag size={18} />
            <span className="text-sm font-medium">Shop</span>
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'pets' && (
          <div className="space-y-6">
            {/* Pet Selection */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {user.ownedPets.map((pet) => (
                <button
                  key={pet.petId}
                  onClick={() => setSelectedPet(pet)}
                  className={`flex-shrink-0 pet-avatar ${
                    selectedPet?.petId === pet.petId ? 'ring-4 ring-white' : ''
                  } transition-all duration-200 hover:scale-105`}
                >
                  {pet.breed === 'cat' ? '🐱' : pet.breed === 'dog' ? '🐶' : '🐹'}
                </button>
              ))}
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex-shrink-0 w-20 h-20 rounded-full bg-white/30 backdrop-blur-sm border-2 border-dashed border-white/50 flex items-center justify-center hover:bg-white/40 transition-all duration-200"
              >
                <Plus size={24} className="text-white" />
              </button>
            </div>

            {/* Selected Pet Card */}
            {selectedPet && (
              <PetCard pet={selectedPet} variant="detailed" />
            )}

            {/* Action Picker */}
            <ActionPicker onAction={handlePetAction} />

            {/* Chat Messages */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {chatMessages.slice(-5).map((message) => (
                <ChatBubble
                  key={message.id}
                  type={message.type}
                  message={message.message}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'community' && (
          <CommunityFeed />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace />
        )}

        {/* Create Pet Modal */}
        {showCreateModal && (
          <CreatePetModal
            onClose={() => setShowCreateModal(false)}
            onCreatePet={handleCreatePet}
          />
        )}
      </div>
    </div>
  );
}
