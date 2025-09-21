'use client';

import { formatDistanceToNow } from '../lib/utils';

interface ChatBubbleProps {
  type: 'user' | 'pet' | 'system';
  message: string;
  timestamp: Date;
  variant?: 'user' | 'pet' | 'system';
}

export function ChatBubble({ type, message, timestamp }: ChatBubbleProps) {
  const getStyles = () => {
    switch (type) {
      case 'user':
        return {
          container: 'ml-auto bg-primary text-white',
          avatar: '👤',
          align: 'text-right'
        };
      case 'pet':
        return {
          container: 'mr-auto bg-white/90 text-gray-900',
          avatar: '🐾',
          align: 'text-left'
        };
      case 'system':
        return {
          container: 'mx-auto bg-accent/20 text-accent border border-accent/30',
          avatar: '🤖',
          align: 'text-center'
        };
      default:
        return {
          container: 'bg-white/90 text-gray-900',
          avatar: '💬',
          align: 'text-left'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`max-w-[80%] ${type === 'system' ? 'mx-auto' : ''}`}>
      <div className={`chat-bubble ${styles.container} ${styles.align}`}>
        <div className="flex items-start gap-2">
          {type !== 'user' && (
            <span className="text-lg flex-shrink-0">{styles.avatar}</span>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed break-words">{message}</p>
            <p className="text-xs opacity-70 mt-1">
              {formatDistanceToNow(timestamp)}
            </p>
          </div>
          {type === 'user' && (
            <span className="text-lg flex-shrink-0">{styles.avatar}</span>
          )}
        </div>
      </div>
    </div>
  );
}
