import { Pet } from './types';

const PET_BREEDS = ['cat', 'dog', 'hamster', 'rabbit', 'bird'];
const PET_COLORS = ['pink', 'blue', 'purple', 'yellow', 'green', 'orange'];
const PERSONALITIES = ['playful', 'sleepy', 'energetic', 'calm', 'mischievous', 'loving'];

export function generatePet(name: string, ownerId: string, breed?: string): Pet {
  const selectedBreed = breed || PET_BREEDS[Math.floor(Math.random() * PET_BREEDS.length)];
  const color = PET_COLORS[Math.floor(Math.random() * PET_COLORS.length)];
  const personality = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];

  return {
    petId: `pet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ownerId,
    name,
    breed: selectedBreed,
    attributes: {
      happiness: 80 + Math.floor(Math.random() * 20),
      hunger: 60 + Math.floor(Math.random() * 30),
      energy: 70 + Math.floor(Math.random() * 30),
      cleanliness: 85 + Math.floor(Math.random() * 15),
    },
    cosmetics: [],
    evolutionLevel: 1,
    lastCareTimestamp: new Date(),
    personality,
    color,
  };
}

export function updatePetStats(pet: Pet, action: string): Pet {
  const updatedPet = { ...pet };
  const now = new Date();
  
  // Calculate time decay since last care
  const timeDiff = now.getTime() - pet.lastCareTimestamp.getTime();
  const hoursPassed = timeDiff / (1000 * 60 * 60);
  
  // Apply natural decay
  updatedPet.attributes = {
    happiness: Math.max(0, pet.attributes.happiness - hoursPassed * 2),
    hunger: Math.max(0, pet.attributes.hunger - hoursPassed * 3),
    energy: Math.max(0, pet.attributes.energy - hoursPassed * 1.5),
    cleanliness: Math.max(0, pet.attributes.cleanliness - hoursPassed * 1),
  };

  // Apply action effects
  switch (action) {
    case 'feed':
      updatedPet.attributes.hunger = Math.min(100, updatedPet.attributes.hunger + 30);
      updatedPet.attributes.happiness = Math.min(100, updatedPet.attributes.happiness + 10);
      break;
    case 'play':
      updatedPet.attributes.happiness = Math.min(100, updatedPet.attributes.happiness + 25);
      updatedPet.attributes.energy = Math.max(0, updatedPet.attributes.energy - 15);
      updatedPet.attributes.hunger = Math.max(0, updatedPet.attributes.hunger - 10);
      break;
    case 'groom':
      updatedPet.attributes.cleanliness = Math.min(100, updatedPet.attributes.cleanliness + 30);
      updatedPet.attributes.happiness = Math.min(100, updatedPet.attributes.happiness + 15);
      break;
    case 'sleep':
      updatedPet.attributes.energy = Math.min(100, updatedPet.attributes.energy + 40);
      updatedPet.attributes.happiness = Math.min(100, updatedPet.attributes.happiness + 5);
      break;
  }

  updatedPet.lastCareTimestamp = now;
  return updatedPet;
}

export function getPetEmoji(breed: string): string {
  const emojiMap: { [key: string]: string } = {
    cat: '🐱',
    dog: '🐶',
    hamster: '🐹',
    rabbit: '🐰',
    bird: '🐦',
  };
  return emojiMap[breed] || '🐾';
}

export function getPetMood(pet: Pet): string {
  const avgStats = (pet.attributes.happiness + pet.attributes.hunger + pet.attributes.energy + pet.attributes.cleanliness) / 4;
  
  if (avgStats >= 80) return 'ecstatic';
  if (avgStats >= 60) return 'happy';
  if (avgStats >= 40) return 'okay';
  if (avgStats >= 20) return 'sad';
  return 'very sad';
}

export function getStatColor(value: number): string {
  if (value >= 80) return 'from-green-400 to-green-600';
  if (value >= 60) return 'from-yellow-400 to-yellow-600';
  if (value >= 40) return 'from-orange-400 to-orange-600';
  return 'from-red-400 to-red-600';
}
