'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Trophy, Camera, Star } from 'lucide-react';
import { CommunityPost } from '../lib/types';

const DEMO_POSTS: CommunityPost[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'PetLover123',
    petId: 'pet1',
    petName: 'Whiskers',
    content: 'Whiskers just reached level 5! So proud of my little furry friend! 🎉',
    likes: 24,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'milestone'
  },
  {
    id: '2',
    userId: 'user2',
    username: 'CutePetOwner',
    petId: 'pet2',
    petName: 'Buddy',
    content: 'Look at Buddy showing off his new rainbow collar! He loves the attention 🌈',
    likes: 18,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: 'photo'
  },
  {
    id: '3',
    userId: 'user3',
    username: 'PetMaster',
    petId: 'pet3',
    petName: 'Luna',
    content: 'Luna won first place in the Cutest Pet Challenge! Thank you everyone for voting! 🏆',
    likes: 45,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    type: 'achievement'
  }
];

export function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>(DEMO_POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    const isLiked = likedPosts.has(postId);
    
    if (isLiked) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    
    setLikedPosts(newLikedPosts);
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + (isLiked ? -1 : 1) }
        : post
    ));
  };

  const getPostIcon = (type: CommunityPost['type']) => {
    switch (type) {
      case 'achievement':
        return <Trophy size={16} className="text-yellow-500" />;
      case 'photo':
        return <Camera size={16} className="text-blue-500" />;
      case 'milestone':
        return <Star size={16} className="text-purple-500" />;
      default:
        return <MessageCircle size={16} className="text-gray-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Community Header */}
      <div className="pet-card text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Community Feed</h2>
        <p className="text-gray-600 text-sm">
          See what other pet owners are up to!
        </p>
      </div>

      {/* Active Challenges */}
      <div className="notification-banner">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={18} />
          <span className="font-semibold">Active Challenge</span>
        </div>
        <p className="text-sm">
          🏆 Cutest Pet Contest - Submit your pet's photo to win exclusive items!
        </p>
        <button className="mt-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors">
          Join Challenge
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="pet-card">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pet-pink to-pet-purple rounded-full flex items-center justify-center text-lg">
                🐾
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{post.username}</span>
                  {getPostIcon(post.type)}
                </div>
                <p className="text-sm text-gray-600">
                  with {post.petName} • {formatTimeAgo(post.timestamp)}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-gray-800 mb-4 leading-relaxed">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  likedPosts.has(post.id)
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart 
                  size={16} 
                  className={likedPosts.has(post.id) ? 'fill-current' : ''} 
                />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <MessageCircle size={16} />
                <span className="text-sm">Comment</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 text-gray-600 hover:text-gray-800 transition-colors">
        Load more posts...
      </button>
    </div>
  );
}
