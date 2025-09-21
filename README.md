# PixelPals Tribe

Your AI-powered virtual pet community on Telegram - A Base Mini App

## Features

- 🐾 **AI Pet Creation & Customization** - Create unique pets with AI-generated personalities
- 🎮 **Interactive Pet Care** - Feed, play, groom, and care for your virtual companions
- 🏆 **Community Challenges** - Participate in contests and climb leaderboards
- 💬 **Telegram Integration** - Seamless bot interactions within Telegram
- 🛍️ **Pet Marketplace** - Trade pets and buy cosmetic items
- 📱 **Mobile-First Design** - Optimized for mobile Telegram experience

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Optimism L2)
- **Wallet**: MiniKit + OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pixelpals-tribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update the following variables:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/products/onchainkit)
   - `TELEGRAM_BOT_TOKEN`: Get from [@BotFather](https://t.me/botfather) on Telegram

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   ├── loading.tsx        # Loading UI
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── PetCard.tsx        # Pet display component
│   ├── ActionPicker.tsx   # Pet care actions
│   ├── ChatBubble.tsx     # Chat message display
│   ├── NotificationBanner.tsx # Notifications
│   ├── CreatePetModal.tsx # Pet creation flow
│   ├── CommunityFeed.tsx  # Social features
│   └── Marketplace.tsx    # Item shop
├── lib/                   # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   ├── petUtils.ts        # Pet logic and AI
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## Design System

The app uses a cohesive design system with:

- **Colors**: Blue-purple-pink gradient theme matching virtual pet aesthetics
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable UI components with consistent styling
- **Animations**: Subtle animations for enhanced user experience
- **Mobile-First**: Responsive design optimized for mobile devices

## Key Features Implementation

### Pet System
- AI-generated personalities and traits
- Real-time stat tracking (happiness, hunger, energy, cleanliness)
- Evolution and leveling system
- Cosmetic customization

### Community Features
- Social feed with posts and interactions
- Challenge system with leaderboards
- Pet trading and marketplace
- Achievement system

### Telegram Integration
- Bot commands for pet care
- Notification system
- Seamless in-app experience
- Context-aware interactions

## Deployment

The app is configured for deployment on Vercel or similar platforms:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel: Connect your GitHub repository
   - Netlify: Deploy from Git
   - Custom: Use `npm start` after building

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Join our Telegram community
- Check the documentation

---

Built with ❤️ for the Base ecosystem and Telegram Mini Apps platform.
