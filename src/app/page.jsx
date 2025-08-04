"use client";

import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import {
  Star,
  TrendingUp,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar.jsx";
import BookingTabs from "../components/BookingTabs.jsx";
import { trendingDestinations } from "../lib/mockData.jsx";

export default function HomePage() {
  const [favorites, setFavorites] = useState(new Set());
  const router = useRouter();

  const toggleFavorite = (destinationId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(destinationId)) {
        newFavorites.delete(destinationId);
      } else {
        newFavorites.add(destinationId);
      }
      return newFavorites;
    });
  };

  const handleDestinationClick = (destination) => {
    // Navigate to search page with destination pre-filled
    const params = new URLSearchParams();
    params.set("location", destination.name);
    params.set("type", "stays");
    // Set default dates (today and tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    params.set("checkIn", today.toISOString().split("T")[0]);
    params.set("checkOut", tomorrow.toISOString().split("T")[0]);
    params.set("adults", "2");
    params.set("children", "0");
    params.set("rooms", "1");

    router.push(`/search?${params.toString()}`);
  };

  const handleSearch = (searchData) => {
    // Navigate to search page with search parameters
    const params = new URLSearchParams();

    if (searchData.type === "stays") {
      if (searchData.destination)
        params.set("location", searchData.destination);
      if (searchData.checkIn)
        params.set("checkIn", searchData.checkIn.toISOString().split("T")[0]);
      if (searchData.checkOut)
        params.set("checkOut", searchData.checkOut.toISOString().split("T")[0]);
      if (searchData.adults) params.set("adults", searchData.adults);
      if (searchData.children) params.set("children", searchData.children);
      if (searchData.rooms) params.set("rooms", searchData.rooms);
    } else if (searchData.type === "flights") {
      if (searchData.from) params.set("from", searchData.from);
      if (searchData.to) params.set("to", searchData.to);
      if (searchData.departDate)
        params.set(
          "departDate",
          searchData.departDate.toISOString().split("T")[0]
        );
      if (searchData.returnDate)
        params.set(
          "returnDate",
          searchData.returnDate.toISOString().split("T")[0]
        );
    }

    params.set("type", searchData.type);

    // Navigate to search page
    window.location.href = `/search?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Navbar />

      {/* Hero Section */}
      <Box
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white"
        sx={{
          backgroundImage:
            "linear-gradient(rgba(2, 132, 199, 0.85), rgba(3, 105, 161, 0.9)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: "50vh", sm: "60vh", md: "65vh" },
          display: "flex",
          alignItems: "center",
          padding: { xs: "20px 0", sm: "40px 0" },
        }}
      >
        <Container maxWidth="lg">
          <Box className="text-center mb-4 sm:mb-8 px-4">
            <Typography
              variant="h2"
              component="h1"
              className="font-bold mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Find Your Perfect Stay
            </Typography>
            <Typography
              variant="h5"
              className="mb-6 sm:mb-8 text-lg sm:text-xl md:text-2xl font-light opacity-90 px-4"
            >
              Discover amazing hotels, resorts, and unique accommodations
              worldwide
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Booking Tabs */}
      <Box className="relative -mt-20 z-10">
        <BookingTabs onSearch={handleSearch} />
      </Box>

      {/* Trending Destinations */}
      <Container maxWidth="lg" className="py-16">
        <Box className="text-center mb-12">
          <Box className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="text-primary-600" />
            <Typography
              variant="h4"
              component="h2"
              className="font-bold text-gray-900 dark:text-gray-100"
            >
              Trending Destinations
            </Typography>
          </Box>
          <Typography
            variant="body1"
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore the most popular destinations chosen by millions of
            travelers worldwide
          </Typography>
        </Box>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
          {trendingDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleDestinationClick(destination)}
              sx={{
                height: { xs: 220, sm: 250, md: 280 },
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                position: "relative",
              }}
            >
              <Box className="relative flex-1 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://picsum.photos/400/280?random=${destination.id}`;
                  }}
                />

                {/* Favorite Button */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(destination.id);
                  }}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white transition-all duration-300 shadow-lg"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(4px)",
                    zIndex: 10,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {favorites.has(destination.id) ? (
                    <Favorite className="text-secondary-600 text-base" />
                  ) : (
                    <FavoriteBorder className="text-neutral-700 text-base" />
                  )}
                </IconButton>

                <Box className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <Box className="absolute bottom-3 left-3 right-3 text-white">
                  <Typography
                    variant="h6"
                    className="font-bold mb-1 text-white"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1.125rem" },
                      lineHeight: 1.2,
                      textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                    }}
                  >
                    {destination.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-white/90"
                    sx={{
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                    }}
                  >
                    {destination.hotels} hotels
                  </Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </div>
      </Container>

      {/* Features Section */}
      <Box className="bg-white dark:bg-gray-800 py-12 sm:py-16">
        <Container maxWidth="lg">
          <Box className="text-center mb-8 sm:mb-12 px-4">
            <Typography
              variant="h4"
              component="h2"
              className="font-bold text-gray-900 dark:text-gray-100 mb-4 text-2xl sm:text-3xl md:text-4xl"
            >
              Why Choose StayNest?
            </Typography>
            <Typography
              variant="body1"
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base"
            >
              We make finding and booking your perfect accommodation simple and
              secure
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 4, sm: 6 }} className="px-4 sm:px-0">
            <Grid item xs={12} sm={6} md={4}>
              <Box className="text-center">
                <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Star className="text-primary-600 text-xl sm:text-2xl" />
                </Box>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-lg sm:text-xl"
                >
                  Best Price Guarantee
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                >
                  Find a lower price? We'll match it and give you an extra 10%
                  off your next booking.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box className="text-center">
                <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Star className="text-primary-600 text-xl sm:text-2xl" />
                </Box>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-lg sm:text-xl"
                >
                  24/7 Customer Support
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                >
                  Our dedicated support team is available around the clock to
                  help with any questions.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box className="text-center">
                <Box className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Star className="text-primary-600 text-xl sm:text-2xl" />
                </Box>
                <Typography
                  variant="h6"
                  className="font-semibold mb-2 text-gray-900 dark:text-gray-100 text-lg sm:text-xl"
                >
                  Secure Booking
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                >
                  Your personal and payment information is protected with
                  industry-leading security.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="bg-white dark:bg-gray-800 py-12 sm:py-16">
        <Container maxWidth="lg">
          <Box className="text-center px-4">
            <Typography
              variant="h4"
              component="h2"
              className="font-bold mb-4 text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl"
            >
              Ready to Start Your Journey?
            </Typography>
            <Typography
              variant="body1"
              className="mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
            >
              Join millions of travelers who trust StayNest for their
              accommodations
            </Typography>
            <Button
              variant="contained"
              size="large"
              className="bg-accent-600 hover:bg-accent-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Start Searching
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="bg-neutral-900 text-white py-8 sm:py-12">
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, sm: 4 }} className="px-4 sm:px-0">
            <Grid item xs={12} md={4}>
              <Box className="mb-4 text-center md:text-left">
                <img
                  src="/staynestlogo.png"
                  alt="StayNest"
                  className="h-12 sm:h-16 w-auto mb-3 sm:mb-4 mx-auto md:mx-0"
                />
              </Box>
              <Typography variant="body2" className="text-gray-400 mb-4 text-center md:text-left text-sm sm:text-base">
                Your trusted partner for finding perfect accommodations
                worldwide.
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography variant="h6" className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Company
              </Typography>
              <Box className="space-y-1 sm:space-y-2">
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
                >
                  About Us
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
                >
                  Careers
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
                >
                  Press
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={2}>
              <Typography variant="h6" className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                Support
              </Typography>
              <Box className="space-y-1 sm:space-y-2">
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
                >
                  Help Center
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer text-xs sm:text-sm"
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="font-semibold mb-4">
                Subscribe to our Newsletter
              </Typography>
              <Typography variant="body2" className="text-gray-400 mb-4">
                Get the latest travel deals and updates
              </Typography>
              <Box className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
                />
                <Button
                  variant="contained"
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box className="border-t border-gray-800 mt-8 pt-8 text-center">
            <Typography variant="body2" className="text-gray-400">
              © 2025 StayNest. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
