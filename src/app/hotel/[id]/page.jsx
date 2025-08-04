"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Rating,
  IconButton,
  ImageList,
  ImageListItem,
  Divider,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocationOn,
  Star,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  FitnessCenter,
  LocalParking,
  RoomService,
} from "@mui/icons-material";
import Navbar from "../../../components/Navbar.jsx";
import { mockHotels } from "../../../lib/mockData.jsx";

const amenityIcons = {
  wifi: <Wifi className="w-5 h-5" />,
  pool: <Pool className="w-5 h-5" />,
  restaurant: <Restaurant className="w-5 h-5" />,
  spa: <Spa className="w-5 h-5" />,
  gym: <FitnessCenter className="w-5 h-5" />,
  parking: <LocalParking className="w-5 h-5" />,
  "room service": <RoomService className="w-5 h-5" />,
};

const mockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Amazing stay!",
    content:
      "This hotel exceeded all my expectations. The staff was incredibly friendly and the room was spotless.",
    avatar: "S",
  },
  {
    id: 2,
    author: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Great location",
    content:
      "Perfect location for exploring the city. The amenities were top-notch and the breakfast was delicious.",
    avatar: "M",
  },
  {
    id: 3,
    author: "Emily Davis",
    rating: 5,
    date: "2024-01-05",
    title: "Perfect for business travel",
    content:
      "Clean, comfortable, and well-equipped for business needs. Would definitely stay here again.",
    avatar: "E",
  },
];

const mockImages = [
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
];

export default function HotelDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundHotel = mockHotels.find((h) => h.id === parseInt(params.id));
      setHotel(foundHotel);
      setLoading(false);
    }, 500);
  }, [params.id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBookNow = () => {
    router.push(`/booking/${hotel.id}`);
  };

  const getAmenityIcon = (amenity) => {
    const key = amenity.toLowerCase().replace(/\s+/g, "").replace("free", "");
    return amenityIcons[key] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Container maxWidth="lg" className="py-8">
          <LinearProgress />
        </Container>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Container maxWidth="lg" className="py-8 text-center">
          <Typography variant="h4" className="text-gray-600 dark:text-gray-400">
            Hotel not found
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <Container maxWidth="lg" className="py-6">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-gray-800"
        >
          Back to search
        </Button>

        {/* Hotel Header */}
        <Box className="mb-6">
          <Box className="flex justify-between items-start mb-4">
            <Box>
              <Typography
                variant="h4"
                className="font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                {hotel.name}
              </Typography>
              <Box className="flex items-center mb-2">
                <LocationOn className="w-5 h-5 mr-1 text-gray-600" />
                <Typography
                  variant="body1"
                  className="text-gray-600 dark:text-gray-400"
                >
                  {hotel.location} • {hotel.distance} km from center
                </Typography>
              </Box>
              <Box className="flex items-center">
                <Rating
                  value={hotel.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <Typography
                  variant="body2"
                  className="ml-2 text-gray-600 dark:text-gray-400"
                >
                  {hotel.rating} ({hotel.reviewCount} reviews)
                </Typography>
              </Box>
            </Box>

            <Box className="flex gap-2">
              <IconButton onClick={toggleFavorite}>
                {isFavorite ? (
                  <Favorite className="text-red-500" />
                ) : (
                  <FavoriteBorder className="text-gray-400" />
                )}
              </IconButton>
              <IconButton>
                <Share className="text-gray-400" />
              </IconButton>
            </Box>
          </Box>

          {/* Image Gallery */}
          <Grid container spacing={2} className="mb-6">
            <Grid xs={12} md={8}>
              <img
                src={mockImages[selectedImage]}
                alt={hotel.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </Grid>
            <Grid xs={12} md={4}>
              <Grid container spacing={1}>
                {mockImages.slice(1, 5).map((image, index) => (
                  <Grid xs={6} key={index}>
                    <img
                      src={image}
                      alt={`${hotel.name} ${index + 2}`}
                      className={`w-full h-24 object-cover rounded cursor-pointer ${
                        selectedImage === index + 1
                          ? "ring-2 ring-primary-500"
                          : ""
                      }`}
                      onClick={() => setSelectedImage(index + 1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={6}>
          {/* Main Content */}
          <Grid xs={12} lg={8}>
            {/* Description */}
            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-3">
                  About this property
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-700 dark:text-gray-300 mb-4"
                >
                  {hotel.description}
                </Typography>
                <Typography
                  variant="body1"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Experience luxury and comfort at {hotel.name}, where every
                  detail has been carefully crafted to ensure an unforgettable
                  stay. Our world-class amenities and exceptional service will
                  exceed your expectations.
                </Typography>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="mb-6">
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {hotel.amenities.map((amenity) => {
                    const icon = getAmenityIcon(amenity);
                    return (
                      <Grid xs={12} sm={6} md={4} key={amenity}>
                        <Box className="flex items-center gap-2 p-2">
                          {icon || (
                            <Star className="w-5 h-5 text-primary-600" />
                          )}
                          <Typography
                            variant="body2"
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {amenity}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardContent>
                <Typography variant="h6" className="font-semibold mb-4">
                  Guest Reviews
                </Typography>

                {/* Review Summary */}
                <Box className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Box className="flex items-center gap-4 mb-3">
                    <Typography
                      variant="h4"
                      className="font-bold text-primary-600"
                    >
                      {hotel.rating}
                    </Typography>
                    <Box>
                      <Rating value={hotel.rating} precision={0.1} readOnly />
                      <Typography
                        variant="body2"
                        className="text-gray-600 dark:text-gray-400"
                      >
                        Based on {hotel.reviewCount} reviews
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body1"
                    className="font-medium text-gray-900 dark:text-gray-100"
                  >
                    Excellent
                  </Typography>
                </Box>

                {/* Individual Reviews */}
                <Box className="space-y-4">
                  {mockReviews.map((review) => (
                    <Box
                      key={review.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                    >
                      <Box className="flex items-start gap-3">
                        <Avatar className="bg-primary-600">
                          {review.avatar}
                        </Avatar>
                        <Box className="flex-1">
                          <Box className="flex items-center gap-2 mb-1">
                            <Typography
                              variant="subtitle2"
                              className="font-medium"
                            >
                              {review.author}
                            </Typography>
                            <Rating
                              value={review.rating}
                              size="small"
                              readOnly
                            />
                            <Typography
                              variant="caption"
                              className="text-gray-500"
                            >
                              {new Date(review.date).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Typography
                            variant="subtitle2"
                            className="font-medium mb-1"
                          >
                            {review.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {review.content}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Booking Sidebar */}
          <Grid xs={12} lg={4}>
            <Card className="sticky top-6">
              <CardContent>
                <Box className="text-center mb-4">
                  <Typography
                    variant="h5"
                    className="font-bold text-primary-600"
                  >
                    ${hotel.price}
                    <Typography
                      component="span"
                      variant="body1"
                      className="text-gray-500 ml-1"
                    >
                      /night
                    </Typography>
                  </Typography>
                  <Typography variant="body2" className="text-gray-500">
                    + taxes and fees
                  </Typography>
                </Box>

                <Divider className="mb-4" />

                {/* Quick booking form would go here */}
                <Box className="space-y-3 mb-4">
                  <Typography variant="subtitle2" className="font-medium">
                    Check availability
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-600 dark:text-gray-400"
                  >
                    Select your dates to see current pricing and availability
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleBookNow}
                  className="bg-accent-600 hover:bg-accent-700 text-white font-semibold mb-3 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Reserve Now
                </Button>

                <Button fullWidth variant="outlined" size="large">
                  Contact Property
                </Button>

                <Box className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <Typography
                    variant="caption"
                    className="text-green-700 dark:text-green-400 font-medium"
                  >
                    ✓ Free cancellation until 24 hours before check-in
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
