"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  LocationOn,
  Star,
  Wifi,
  Pool,
  Restaurant,
  Spa,
  FitnessCenter,
} from "@mui/icons-material";

const amenityIcons = {
  wifi: <Wifi className="w-4 h-4" />,
  pool: <Pool className="w-4 h-4" />,
  restaurant: <Restaurant className="w-4 h-4" />,
  spa: <Spa className="w-4 h-4" />,
  gym: <FitnessCenter className="w-4 h-4" />,
};

export default function HotelCard({ hotel, variant = "grid" }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const getAmenityIcon = (amenity) => {
    const key = amenity.toLowerCase().replace(/\s+/g, "").replace("free", "");
    return amenityIcons[key] || null;
  };

  if (variant === "list") {
    return (
      <Link href={`/hotel/${hotel.id}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-4">
          <Box className="flex flex-col md:flex-row">
            <CardMedia
              component="img"
              className="h-48 md:h-40 md:w-64 object-cover"
              image={hotel.image}
              alt={hotel.name}
            />
            <Box className="flex-1 flex flex-col">
              <CardContent className="flex-1 p-4">
                <Box className="flex justify-between items-start mb-2">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900 dark:text-gray-100"
                  >
                    {hotel.name}
                  </Typography>
                  <IconButton
                    onClick={toggleFavorite}
                    className="p-1"
                    size="small"
                  >
                    {isFavorite ? (
                      <Favorite className="text-red-500" />
                    ) : (
                      <FavoriteBorder className="text-gray-400" />
                    )}
                  </IconButton>
                </Box>

                <Box className="flex items-center mb-2 text-gray-600 dark:text-gray-400">
                  <LocationOn className="w-4 h-4 mr-1" />
                  <Typography variant="body2">{hotel.location}</Typography>
                  <Typography variant="body2" className="ml-2">
                    • {hotel.distance} km from center
                  </Typography>
                </Box>

                <Box className="flex items-center mb-2">
                  <Rating
                    value={hotel.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    className="ml-1 text-gray-600 dark:text-gray-400"
                  >
                    {hotel.rating} ({hotel.reviewCount} reviews)
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2"
                >
                  {hotel.description}
                </Typography>

                <Box className="flex flex-wrap gap-1 mb-2">
                  {hotel.amenities.slice(0, 4).map((amenity) => (
                    <Tooltip key={amenity} title={amenity}>
                      <Chip
                        icon={getAmenityIcon(amenity)}
                        label={amenity}
                        size="small"
                        variant="outlined"
                        className="text-xs"
                      />
                    </Tooltip>
                  ))}
                  {hotel.amenities.length > 4 && (
                    <Chip
                      label={`+${hotel.amenities.length - 4} more`}
                      size="small"
                      variant="outlined"
                      className="text-xs"
                    />
                  )}
                </Box>
              </CardContent>

              <CardActions className="flex justify-between items-center p-4 pt-0">
                <Box className="text-right">
                  <Typography
                    variant="body2"
                    className="text-gray-500 dark:text-gray-400"
                  >
                    Starting from
                  </Typography>
                  <Typography
                    variant="h6"
                    className="font-bold text-primary-600"
                  >
                    ${hotel.price}
                    <Typography
                      component="span"
                      variant="body2"
                      className="text-gray-500 ml-1"
                    >
                      /night
                    </Typography>
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" className="ml-4">
                  View Details
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/hotel/${hotel.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col relative overflow-hidden">
        <Box className="relative">
          <CardMedia
            component="img"
            height="200"
            image={hotel.image}
            alt={hotel.name}
            className="h-48 object-cover"
          />
          <IconButton
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 shadow-sm"
            size="small"
            sx={{
              padding: '6px',
              '&:hover': {
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isFavorite ? (
              <Favorite className="text-red-500" fontSize="small" />
            ) : (
              <FavoriteBorder className="text-gray-600" fontSize="small" />
            )}
          </IconButton>
        </Box>

        <CardContent className="flex-1 p-4">
          <Typography
            variant="h6"
            className="font-semibold text-gray-900 dark:text-gray-100 mb-1"
          >
            {hotel.name}
          </Typography>

          <Box className="flex items-center mb-2 text-gray-600 dark:text-gray-400">
            <LocationOn className="w-4 h-4 mr-1" />
            <Typography variant="body2">{hotel.location}</Typography>
          </Box>

          <Box className="flex items-center mb-2">
            <Rating
              value={hotel.rating}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography
              variant="body2"
              className="ml-1 text-gray-600 dark:text-gray-400"
            >
              {hotel.rating}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2"
          >
            {hotel.description}
          </Typography>

          <Box className="flex flex-wrap gap-1 mb-3">
            {hotel.amenities.slice(0, 3).map((amenity) => {
              const icon = getAmenityIcon(amenity);
              return (
                <Tooltip key={amenity} title={amenity}>
                  <Chip
                    icon={icon}
                    label={icon ? "" : amenity}
                    size="small"
                    variant="outlined"
                    className="text-xs"
                  />
                </Tooltip>
              );
            })}
            {hotel.amenities.length > 3 && (
              <Chip
                label={`+${hotel.amenities.length - 3}`}
                size="small"
                variant="outlined"
                className="text-xs"
              />
            )}
          </Box>
        </CardContent>

        <CardActions className="flex justify-between items-center p-4 pt-0">
          <Box className="text-right">
            <Typography
              variant="body2"
              className="text-gray-500 dark:text-gray-400"
            >
              Starting from
            </Typography>
            <Typography variant="h6" className="font-bold text-primary-600">
              ${hotel.price}
              <Typography
                component="span"
                variant="body2"
                className="text-gray-500 ml-1"
              >
                /night
              </Typography>
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Link>
  );
}
