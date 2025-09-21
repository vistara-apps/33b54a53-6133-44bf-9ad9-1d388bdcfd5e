'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Pet {
  pet_id: string;
  name: string;
  breed: string;
  attributes: {
    strength: number;
    intelligence: number;
    agility: number;
    charisma: number;
  };
  evolution_level: number;
  hunger_level: number;
  happiness_level: number;
  last_care_timestamp: string;
}

interface Challenge {
  challenge_id: string;
  name: string;
  description: string;
  end_date: string;
  participants: string[];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'pets' | 'challenges' | 'marketplace'>('pets');
  const [pets, setPets] = useState<Pet[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Telegram Web App
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }

    // Load initial data
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // In a real app, this would fetch from your API
      // For now, we'll show mock data
      setPets([]);
      setChallenges([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePet = () => {
    // This would trigger the Telegram bot to create a pet
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'create_pet'
      }));
    }
  };

  const handlePetAction = (petId: string, action: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'pet_action',
        petId,
        type: action
      }));
    }
  };

  const handleJoinChallenge = (challengeId: string) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'join_challenge',
        challengeId
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading PixelPals Tribe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-foreground">
      {/* Header */}
      <header className="bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐾</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">PixelPals Tribe</h1>
              <p className="text-sm text-muted-foreground">AI-powered virtual pets</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-surface border-b border-border">
        <div className="flex">
          {[
            { id: 'pets', label: 'My Pets', icon: '🐾' },
            { id: 'challenges', label: 'Challenges', icon: '🏆' },
            { id: 'marketplace', label: 'Marketplace', icon: '🛍️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 px-4 text-center transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="text-lg mb-1">{tab.icon}</div>
              <div className="text-xs font-medium">{tab.label}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {activeTab === 'pets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-semibold">My Pets</h2>
              <Button onClick={handleCreatePet} size="sm">
                + New Pet
              </Button>
            </div>

            {pets.length === 0 ? (
              <Card className="bg-surface border-border">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🐾</div>
                  <h3 className="font-heading font-semibold mb-2">No pets yet!</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first AI-powered virtual pet to get started.
                  </p>
                  <Button onClick={handleCreatePet}>Create Your First Pet</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pets.map((pet) => (
                  <Card key={pet.pet_id} className="bg-surface border-border">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{pet.name}</CardTitle>
                          <CardDescription>{pet.breed} • Level {pet.evolution_level}</CardDescription>
                        </div>
                        <Badge variant="secondary">⭐ {pet.evolution_level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Strength</div>
                          <div className="font-semibold">{pet.attributes.strength}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Intelligence</div>
                          <div className="font-semibold">{pet.attributes.intelligence}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Agility</div>
                          <div className="font-semibold">{pet.attributes.agility}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Charisma</div>
                          <div className="font-semibold">{pet.attributes.charisma}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Hunger</span>
                          <span>{pet.hunger_level}/100</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full transition-all"
                            style={{ width: `${pet.hunger_level}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span>Happiness</span>
                          <span>{pet.happiness_level}/100</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${pet.happiness_level}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePetAction(pet.pet_id, 'feed')}
                        >
                          🍎 Feed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePetAction(pet.pet_id, 'play')}
                        >
                          🎾 Play
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePetAction(pet.pet_id, 'groom')}
                        >
                          🧼 Groom
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePetAction(pet.pet_id, 'rest')}
                        >
                          💤 Rest
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-semibold">Active Challenges</h2>

            {challenges.length === 0 ? (
              <Card className="bg-surface border-border">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="font-heading font-semibold mb-2">No active challenges</h3>
                  <p className="text-muted-foreground">
                    Check back later for community challenges and competitions!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.challenge_id} className="bg-surface border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        🏆 {challenge.name}
                      </CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                          👥 {challenge.participants?.length || 0} participants
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ends: {new Date(challenge.end_date).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => handleJoinChallenge(challenge.challenge_id)}
                      >
                        Join Challenge
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div className="space-y-4">
            <h2 className="text-lg font-heading font-semibold">Marketplace</h2>

            <Card className="bg-surface border-border">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🛍️</div>
                <h3 className="font-heading font-semibold mb-2">Coming Soon!</h3>
                <p className="text-muted-foreground">
                  Trade pets, buy cosmetics, and explore exclusive items.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

