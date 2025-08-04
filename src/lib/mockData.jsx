// Mock hotel data
export const mockHotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "New York, NY",
    rating: 4.8,
    reviewCount: 1247,
    price: 299,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Pool", "Gym", "Spa", "Restaurant"],
    description:
      "Luxury hotel in the heart of Manhattan with stunning city views.",
    distance: 0.5,
  },
  {
    id: 2,
    name: "Seaside Resort & Spa",
    location: "Miami Beach, FL",
    rating: 4.6,
    reviewCount: 892,
    price: 189,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    amenities: ["Beach Access", "Pool", "WiFi", "Restaurant", "Bar"],
    description:
      "Beautiful beachfront resort with pristine white sand beaches.",
    distance: 0.2,
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Aspen, CO",
    rating: 4.7,
    reviewCount: 634,
    price: 249,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    amenities: ["Ski Access", "Fireplace", "WiFi", "Restaurant", "Spa"],
    description: "Cozy mountain lodge with breathtaking alpine views.",
    distance: 1.2,
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "San Francisco, CA",
    rating: 4.5,
    reviewCount: 1156,
    price: 179,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Gym", "Business Center", "Concierge"],
    description:
      "Modern boutique hotel in the heart of downtown San Francisco.",
    distance: 0.8,
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    location: "Scottsdale, AZ",
    rating: 4.9,
    reviewCount: 743,
    price: 329,
    image:
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&h=400&fit=crop",
    amenities: ["Pool", "Golf Course", "Spa", "Restaurant", "WiFi"],
    description:
      "Luxury desert resort with championship golf course and world-class spa.",
    distance: 2.1,
  },
  {
    id: 6,
    name: "Historic Inn & Suites",
    location: "Charleston, SC",
    rating: 4.4,
    reviewCount: 567,
    price: 159,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Courtyard", "Historic Tours"],
    description:
      "Charming historic inn in the heart of Charleston's historic district.",
    distance: 0.3,
  },
  // Hotels for Trending Destinations
  {
    id: 7,
    name: "Kuala Lumpur Grand Hotel",
    location: "Kuala Lumpur, Malaysia",
    rating: 4.8,
    reviewCount: 2156,
    price: 85,
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "City View"],
    description: "Luxury hotel with stunning Petronas Towers view.",
    distance: 0.5,
  },
  {
    id: 8,
    name: "Tokyo Imperial Hotel",
    location: "Tokyo, Japan",
    rating: 4.9,
    reviewCount: 1892,
    price: 185,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Gym", "Business Center", "Garden"],
    description: "Traditional Japanese hospitality in the heart of Tokyo.",
    distance: 0.3,
  },
  {
    id: 9,
    name: "London Bridge Hotel",
    location: "London, UK",
    rating: 4.7,
    reviewCount: 1523,
    price: 145,
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Thames View"],
    description: "Elegant hotel with Thames views near Tower Bridge.",
    distance: 0.2,
  },
  {
    id: 10,
    name: "Dubai Marina Resort",
    location: "Dubai, UAE",
    rating: 4.8,
    reviewCount: 987,
    price: 225,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    amenities: ["Pool", "Beach Access", "Spa", "Restaurant", "Marina View"],
    description: "Luxury resort with private beach and marina access.",
    distance: 0.4,
  },
  {
    id: 11,
    name: "Sydney Opera House Hotel",
    location: "Sydney, Australia",
    rating: 4.6,
    reviewCount: 734,
    price: 165,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Harbour View", "Gym", "Bar"],
    description: "Iconic location with Sydney Opera House and harbour views.",
    distance: 0.1,
  },
  {
    id: 12,
    name: "Rome Colosseum Palace",
    location: "Rome, Italy",
    rating: 4.5,
    reviewCount: 1089,
    price: 125,
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Historic Views",
      "Concierge",
      "Terrace",
    ],
    description: "Historic hotel with views of the ancient Colosseum.",
    distance: 0.3,
  },
  {
    id: 13,
    name: "Barcelona Gothic Quarter Hotel",
    location: "Barcelona, Spain",
    rating: 4.4,
    reviewCount: 856,
    price: 105,
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop",
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Gothic Architecture",
      "Courtyard",
      "Bar",
    ],
    description: "Boutique hotel in the historic Gothic Quarter.",
    distance: 0.2,
  },
];

// Mock trending destinations
export const trendingDestinations = [
  {
    id: 1,
    name: "Kuala Lumpur, Malaysia",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    hotels: 1156,
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 892,
  },
  {
    id: 3,
    name: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 1456,
  },
  {
    id: 4,
    name: "London, UK",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 1123,
  },
  {
    id: 5,
    name: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 987,
  },
  {
    id: 6,
    name: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 734,
  },
  {
    id: 7,
    name: "Rome, Italy",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 1089,
  },
  {
    id: 8,
    name: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    hotels: 856,
  },
];

// Filter utilities
export const filterHotels = (hotels, filters) => {
  return hotels.filter((hotel) => {
    // Price filter
    if (
      filters.priceRange &&
      (hotel.price < filters.priceRange[0] ||
        hotel.price > filters.priceRange[1])
    ) {
      return false;
    }

    // Rating filter
    if (filters.minRating && hotel.rating < filters.minRating) {
      return false;
    }

    // Distance filter
    if (filters.maxDistance && hotel.distance > filters.maxDistance) {
      return false;
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      const hasRequiredAmenities = filters.amenities.every((amenity) =>
        hotel.amenities.some((hotelAmenity) =>
          hotelAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasRequiredAmenities) return false;
    }

    return true;
  });
};

export const sortHotels = (hotels, sortBy) => {
  const sortedHotels = [...hotels];

  switch (sortBy) {
    case "price-low":
      return sortedHotels.sort((a, b) => a.price - b.price);
    case "price-high":
      return sortedHotels.sort((a, b) => b.price - a.price);
    case "rating":
      return sortedHotels.sort((a, b) => b.rating - a.rating);
    case "distance":
      return sortedHotels.sort((a, b) => a.distance - b.distance);
    default:
      return sortedHotels;
  }
};

// Mock flight data
export const mockFlights = [
  {
    id: 1,
    airline: "Malaysia Airlines",
    flightNumber: "MH123",
    from: "Kuala Lumpur (KUL)",
    to: "Singapore (SIN)",
    departTime: "08:30",
    arriveTime: "09:45",
    duration: "1h 15m",
    price: 299,
    stops: 0,
    aircraft: "Boeing 737",
    cabinClass: "Economy",
  },
  {
    id: 2,
    airline: "Singapore Airlines",
    flightNumber: "SQ456",
    from: "Singapore (SIN)",
    to: "Bangkok (BKK)",
    departTime: "14:20",
    arriveTime: "15:35",
    duration: "1h 15m",
    price: 425,
    stops: 0,
    aircraft: "Airbus A320",
    cabinClass: "Economy",
  },
  {
    id: 3,
    airline: "Thai Airways",
    flightNumber: "TG789",
    from: "Bangkok (BKK)",
    to: "Jakarta (CGK)",
    departTime: "19:15",
    arriveTime: "22:30",
    duration: "3h 15m",
    price: 380,
    stops: 0,
    aircraft: "Boeing 777",
    cabinClass: "Economy",
  },
];

// Mock attractions data
export const mockAttractions = [
  {
    id: 1,
    name: "Petronas Twin Towers",
    location: "Kuala Lumpur, Malaysia",
    rating: 4.7,
    reviewCount: 2543,
    price: 45,
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=400&fit=crop",
    category: "Architecture",
    duration: "2-3 hours",
    description:
      "Iconic twin skyscrapers with observation deck and stunning city views.",
    highlights: [
      "Observation Deck",
      "City Views",
      "Photography",
      "Shopping Mall",
    ],
  },
  {
    id: 2,
    name: "Universal Studios Singapore",
    location: "Singapore",
    rating: 4.5,
    reviewCount: 1876,
    price: 89,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop",
    category: "Theme Park",
    duration: "Full day",
    description:
      "Southeast Asia's first and only Universal Studios theme park.",
    highlights: [
      "Roller Coasters",
      "Shows",
      "Character Meet & Greet",
      "Dining",
    ],
  },
  {
    id: 3,
    name: "Gardens by the Bay",
    location: "Singapore",
    rating: 4.8,
    reviewCount: 3421,
    price: 32,
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    category: "Nature",
    duration: "3-4 hours",
    description:
      "Futuristic park featuring the iconic Supertree Grove and conservatories.",
    highlights: [
      "Supertree Grove",
      "Cloud Forest",
      "Flower Dome",
      "Light Show",
    ],
  },
];

// Mock airport taxi data
export const mockTaxis = [
  {
    id: 1,
    vehicleType: "Economy",
    vehicleName: "Toyota Vios",
    capacity: "1-3 passengers",
    price: 45,
    duration: "45 mins",
    features: ["Air Conditioning", "GPS Tracking", "English Speaking Driver"],
    image: "🚗",
  },
  {
    id: 2,
    vehicleType: "Comfort",
    vehicleName: "Honda City",
    capacity: "1-4 passengers",
    price: 65,
    duration: "45 mins",
    features: [
      "Premium Interior",
      "Phone Charger",
      "Bottled Water",
      "GPS Tracking",
    ],
    image: "🚙",
  },
  {
    id: 3,
    vehicleType: "Premium",
    vehicleName: "Mercedes E-Class",
    capacity: "1-3 passengers",
    price: 120,
    duration: "45 mins",
    features: [
      "Luxury Vehicle",
      "Professional Chauffeur",
      "Complimentary WiFi",
      "Refreshments",
    ],
    image: "🚘",
  },
];

// Mock flight+hotel packages
export const mockPackages = [
  {
    id: 1,
    destination: "Tokyo, Japan",
    from: "Kuala Lumpur",
    duration: "5 days 4 nights",
    flightPrice: 899,
    hotelPrice: 1200,
    packagePrice: 1699,
    savings: 400,
    rating: 4.8,
    reviewCount: 342,
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    includes: [
      "Return Flights",
      "4-star Hotel",
      "Airport Transfers",
      "Breakfast",
    ],
  },
  {
    id: 2,
    destination: "Paris, France",
    from: "Singapore",
    duration: "7 days 6 nights",
    flightPrice: 1299,
    hotelPrice: 1800,
    packagePrice: 2499,
    savings: 600,
    rating: 4.9,
    reviewCount: 567,
    image:
      "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=400&fit=crop",
    includes: [
      "Return Flights",
      "5-star Hotel",
      "City Tour",
      "Seine River Cruise",
    ],
  },
];

// Search functions for new services
export const searchStays = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockHotels.filter((hotel) => {
        if (
          searchData.destination &&
          !hotel.location
            .toLowerCase()
            .includes(searchData.destination.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
      resolve(filtered);
    }, 1000);
  });
};

export const searchFlights = (searchData) => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockFlights.filter(
          (flight) =>
            flight.from
              .toLowerCase()
              .includes(searchData.from?.toLowerCase() || "") &&
            flight.to.toLowerCase().includes(searchData.to?.toLowerCase() || "")
        )
      );
    }, 1000);
  });
};

export const searchAttractions = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockAttractions.filter((attraction) =>
          attraction.location
            .toLowerCase()
            .includes(searchData.destination?.toLowerCase() || "")
        )
      );
    }, 1000);
  });
};

export const searchTaxis = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTaxis);
    }, 1000);
  });
};

export const searchPackages = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockPackages.filter(
          (pkg) =>
            pkg.from
              .toLowerCase()
              .includes(searchData.from?.toLowerCase() || "") &&
            pkg.destination
              .toLowerCase()
              .includes(searchData.to?.toLowerCase() || "")
        )
      );
    }, 1000);
  });
};

export const searchFlightHotelPackages = (searchData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        mockPackages.filter(
          (pkg) =>
            pkg.from
              .toLowerCase()
              .includes(searchData.from?.toLowerCase() || "") &&
            pkg.destination
              .toLowerCase()
              .includes(searchData.to?.toLowerCase() || "")
        )
      );
    }, 1000);
  });
};
