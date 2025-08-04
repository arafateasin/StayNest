# StayNest - Hotel Booking Platform

A modern, responsive hotel booking platform frontend built with **Next.js**, **React**, **Tailwind CSS**, and **Material UI**. Inspired by booking.com, this project showcases advanced UI/UX patterns and responsive design.

## 🌟 Features

### Core Functionality

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Advanced Search**: Location autocomplete with date picker and guest selection
- **Smart Filtering**: Price range, ratings, distance, and amenity filters
- **Hotel Listings**: Grid and list view with detailed hotel cards
- **Hotel Details**: Image galleries, amenities, reviews, and booking interface
- **Booking Flow**: Multi-step booking process with form validation
- **Dark/Light Mode**: Theme toggle with system preference detection

### UI/UX Features

- **Material Design**: Professional UI components with consistent styling
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized images and lazy loading

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + Material UI
- **Icons**: Material UI Icons
- **Date Picker**: MUI X Date Pickers
- **State Management**: React Hooks (useState, useEffect, useContext)

## 📱 Pages & Components

### Pages

1. **Home Page** (`/`) - Hero section, search bar, trending destinations
2. **Search Results** (`/search`) - Filterable hotel listings with sorting
3. **Hotel Detail** (`/hotel/[id]`) - Detailed hotel view with booking CTA
4. **Booking Flow** (`/booking/[id]`) - Multi-step reservation process

### Key Components

- **Navbar** - Responsive navigation with theme toggle
- **SearchBar** - Advanced search with autocomplete and date selection
- **HotelCard** - Flexible card component (grid/list variants)
- **FilterSidebar** - Comprehensive filtering with collapsible sections
- **ThemeProvider** - Dark/light mode context with localStorage persistence

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design Features

### Responsive Breakpoints

- **Mobile**: < 768px - Stack layouts, mobile-first design
- **Tablet**: 768px - 1024px - Balanced grid layouts
- **Desktop**: > 1024px - Full grid layouts with sidebar

### Color Scheme

- **Primary**: Blue gradient (600-700)
- **Secondary**: Green accent (emerald)
- **Neutral**: Gray scale for backgrounds and text
- **Dark Mode**: Automatic dark variants for all components

### Typography

- **Headings**: Bold, large scale for hierarchy
- **Body**: Clean, readable font stack
- **UI Text**: Smaller, secondary text for metadata

## 📊 Mock Data

The application uses comprehensive mock data including:

- **6 Sample Hotels** with realistic details, pricing, and amenities
- **Trending Destinations** with imagery and hotel counts
- **User Reviews** with ratings and detailed feedback
- **Filter Options** covering price, rating, distance, and amenities

## 🧪 Features Showcase

### Advanced Filtering

- Price range sliders with live updates
- Star rating selection
- Distance from center
- Multi-select amenity checkboxes
- Active filter chips with remove functionality

### Search Experience

- Location autocomplete with popular destinations
- Date picker with validation
- Guest counter with min/max limits
- Search parameter persistence in URL

### Booking Flow

- 4-step wizard: Dates → Guest Info → Payment → Confirmation
- Form validation at each step
- Booking summary with cost breakdown
- Success confirmation with booking ID

### Visual Polish

- Smooth hover animations
- Loading skeletons
- Image galleries with thumbnails
- Progress indicators
- Toast notifications (ready for integration)

## 🔧 Customization

### Theme Configuration

The theme can be customized in `src/lib/ThemeContext.js`:

```javascript
const lightTheme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    secondary: { main: "#10b981" },
  },
});
```

### Tailwind Configuration

Extend the design system in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        /* custom color scale */
      }
    }
  }
}
```

## 📈 Performance Optimizations

- **Next.js Image Optimization** - Automatic WebP conversion and lazy loading
- **Component Code Splitting** - Automatic bundle optimization
- **CSS Purging** - Unused Tailwind classes removed in production
- **Font Optimization** - System font fallbacks

## 🚀 Deployment Ready

The project is configured for easy deployment to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker** containers

## 🎯 Interview Showcase

This project demonstrates:

- **React Best Practices** - Hooks, component composition, state management
- **Responsive Design** - Mobile-first, flexible layouts
- **UI/UX Skills** - Modern design patterns, user flow optimization
- **Code Organization** - Clean file structure, reusable components
- **Performance Awareness** - Optimization techniques and best practices

## 📝 License

This project is created for educational and portfolio purposes.

---

**StayNest** - _Find Your Perfect Stay_ 🏨✨
