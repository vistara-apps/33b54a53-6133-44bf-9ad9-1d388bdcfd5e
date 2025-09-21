'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface CreatePetModalProps {
  onClose: () => void;
  onCreatePet: (name: string, breed: string) => void;
}

const PET_BREEDS = [
  { id: 'cat', name: 'Cat', emoji: '🐱', description: 'Independent and graceful' },
  { id: 'dog', name: 'Dog', emoji: '🐶', description: 'Loyal and playful' },
  { id: 'hamster', name: 'Hamster', emoji: '🐹', description: 'Small and energetic' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰', description: 'Gentle and curious' },
  { id: 'bird', name: 'Bird', emoji: '🐦', description: 'Colorful and musical' }
];

export function CreatePetModal({ onClose, onCreatePet }: CreatePetModalProps) {
  const [petName, setPetName] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('');
  const [step, setStep] = useState<'name' | 'breed' | 'confirm'>('name');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'name' && petName.trim()) {
      setStep('breed');
    } else if (step === 'breed' && selectedBreed) {
      setStep('confirm');
    } else if (step === 'confirm') {
      onCreatePet(petName.trim(), selectedBreed);
    }
  };

  const selectedBreedData = PET_BREEDS.find(breed => breed.id === selectedBreed);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Create New Pet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {step === 'name' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What's your pet's name?
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose a special name for your new companion
                </p>
              </div>

              <div>
                <label htmlFor="petName" className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter a cute name..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  maxLength={20}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-1">
                  {petName.length}/20 characters
                </p>
              </div>
            </div>
          )}

          {step === 'breed' && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Choose {petName}'s breed
                </h3>
                <p className="text-gray-600 text-sm">
                  Each breed has unique traits and personality
                </p>
              </div>

              <div className="grid gap-3">
                {PET_BREEDS.map((breed) => (
                  <button
                    key={breed.id}
                    type="button"
                    onClick={() => setSelectedBreed(breed.id)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${selectedBreed === breed.id
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{breed.emoji}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{breed.name}</h4>
                        <p className="text-sm text-gray-600">{breed.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'confirm' && selectedBreedData && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{selectedBreedData.emoji}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Meet {petName}!
                </h3>
                <p className="text-gray-600 text-sm">
                  Your {selectedBreedData.name.toLowerCase()} is ready to join your family
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{petName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breed:</span>
                  <span className="font-semibold">{selectedBreedData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personality:</span>
                  <span className="font-semibold">{selectedBreedData.description}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            {step !== 'name' && (
              <button
                type="button"
                onClick={() => {
                  if (step === 'breed') setStep('name');
                  if (step === 'confirm') setStep('breed');
                }}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={
                (step === 'name' && !petName.trim()) ||
                (step === 'breed' && !selectedBreed)
              }
              className="flex-1 action-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 'confirm' ? 'Create Pet' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
