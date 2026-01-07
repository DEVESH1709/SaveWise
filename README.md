# SaveWise - Personal Savings Goal Tracker

A modern web application for tracking financial savings goals with multi-currency support and real-time exchange rates.

## Features

- **Goal Management**: Create and track multiple savings goals
- **Multi-Currency Support**: Track goals in INR or USD
- **Real-Time Exchange Rates**: Automatic INR/USD conversion using live exchange rates
- **Progress Tracking**: Visual progress bars and percentage completion
- **Contribution History**: Add and track individual contributions to each goal
- **Persistent Storage**: Goals saved locally in browser storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint with TypeScript support

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DEVESH1709/SaveWise.git
cd savewise
```

2. Navigate to the client directory:
```bash
cd client
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Key Design Decisions

### 1. **Local Storage for Persistence**
- Goals are stored in browser's localStorage for simplicity
- No backend required, making the app lightweight and fast
- Data persists across sessions but stays on the user's device

### 2. **Exchange Rate Integration**
- Uses ExchangeRate-API for real-time INR/USD conversion
- Cached for 1 hour to minimize API calls
- Manual refresh option available
- Graceful fallback when API is unavailable

### 3. **Component Architecture**
- Modular component design for reusability
- Custom hooks for separating business logic
- TypeScript for type safety and better developer experience

### 4. **Styling Approach**
- Tailwind CSS v4 for utility-first styling
- Gradient backgrounds for modern UI
- Lucide React icons for consistent iconography
- Responsive grid layouts for mobile support

### 5. **Form Validation**
- Client-side validation for goal names and amounts
- Real-time error feedback
- Maximum limits to prevent overflow errors

### 6. **Progress Calculation**
- Decimal precision for small percentages (< 1%)
- Rounded integers for clearer display on larger percentages
- Normalized to INR for accurate total calculations

### 7. **Currency Display**
- Primary display in goal's native currency
- Secondary display showing USD equivalent
- Totals calculated in INR with USD conversion

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Future Enhancements

- Export data as JSON/CSV
- Goal categories and tags
- Date-based goal deadlines
- Contribution charts and analytics
- Dark mode support
- Additional currency support
- Cloud sync with user accounts
