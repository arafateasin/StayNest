"use client";

import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Slider,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Rating,
  IconButton,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Close, ExpandMore, FilterList } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const amenityOptions = [
  "Free WiFi",
  "Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Bar",
  "Parking",
  "Pet Friendly",
  "Business Center",
  "Room Service",
  "Laundry Service",
  "Beach Access",
];

export default function FilterSidebar({
  open,
  onClose,
  filters,
  onFiltersChange,
  variant = "drawer",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [localFilters, setLocalFilters] = useState({
    priceRange: [0, 500],
    minRating: 0,
    maxDistance: 10,
    amenities: [],
    ...filters,
  });

  const handlePriceChange = (event, newValue) => {
    setLocalFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const handleRatingChange = (event, newValue) => {
    setLocalFilters((prev) => ({ ...prev, minRating: newValue }));
  };

  const handleDistanceChange = (event, newValue) => {
    setLocalFilters((prev) => ({ ...prev, maxDistance: newValue }));
  };

  const handleAmenityChange = (amenity) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      priceRange: [0, 500],
      minRating: 0,
      maxDistance: 10,
      amenities: [],
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterContent = () => (
    <Box className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Header */}
      <Box className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Box className="flex items-center gap-2">
          <FilterList className="text-primary-600" />
          <Typography
            variant="h6"
            className="font-semibold text-gray-900 dark:text-gray-100"
          >
            Filters
          </Typography>
        </Box>
        <Box className="flex items-center gap-2">
          {/* Active filters count */}
          {(localFilters.priceRange[0] > 0 ||
            localFilters.priceRange[1] < 500 ||
            localFilters.minRating > 0 ||
            localFilters.maxDistance < 10 ||
            localFilters.amenities.length > 0) && (
            <Typography
              variant="caption"
              className="text-primary-600 font-medium"
            >
              {(localFilters.priceRange[0] > 0 ||
              localFilters.priceRange[1] < 500
                ? 1
                : 0) +
                (localFilters.minRating > 0 ? 1 : 0) +
                (localFilters.maxDistance < 10 ? 1 : 0) +
                localFilters.amenities.length}{" "}
              active
            </Typography>
          )}
          {/* Close button - always visible when drawer is open */}
          <IconButton
            onClick={onClose}
            size="small"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Close />
          </IconButton>
        </Box>
      </Box>

      <Box className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Price Range */}
        <Accordion
          defaultExpanded
          className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm"
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className="bg-gray-50 dark:bg-gray-800 rounded-t-lg"
          >
            <Box className="flex items-center gap-2">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-900 dark:text-gray-100"
              >
                💰 Price Range
              </Typography>
              {(localFilters.priceRange[0] > 0 ||
                localFilters.priceRange[1] < 500) && (
                <Typography
                  variant="caption"
                  className="text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
                >
                  ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails className="bg-white dark:bg-gray-900">
            <Box className="px-2 py-2">
              <Slider
                value={localFilters.priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                step={10}
                valueLabelFormat={(value) => `$${value}`}
                className="mb-4"
                sx={{
                  color: "primary.main",
                  "& .MuiSlider-thumb": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  },
                }}
              />
              <Box className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">
                  ${localFilters.priceRange[0]}
                </span>
                <span className="font-medium">
                  ${localFilters.priceRange[1]}+
                </span>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Rating */}
        <Accordion
          defaultExpanded
          className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm"
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className="bg-gray-50 dark:bg-gray-800 rounded-t-lg"
          >
            <Box className="flex items-center gap-2">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-900 dark:text-gray-100"
              >
                ⭐ Minimum Rating
              </Typography>
              {localFilters.minRating > 0 && (
                <Typography
                  variant="caption"
                  className="text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
                >
                  {localFilters.minRating}+ stars
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails className="bg-white dark:bg-gray-900">
            <Box className="px-2 py-2">
              <Rating
                value={localFilters.minRating}
                onChange={handleRatingChange}
                precision={0.5}
                size="large"
                className="mb-3"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#fbbf24",
                  },
                  "& .MuiRating-iconHover": {
                    color: "#f59e0b",
                  },
                }}
              />
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-400 font-medium"
              >
                {localFilters.minRating > 0
                  ? `${localFilters.minRating} stars and above`
                  : "Any rating"}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Distance */}
        <Accordion
          defaultExpanded
          className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm"
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className="bg-gray-50 dark:bg-gray-800 rounded-t-lg"
          >
            <Box className="flex items-center gap-2">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-900 dark:text-gray-100"
              >
                📍 Distance from Center
              </Typography>
              {localFilters.maxDistance < 20 && (
                <Typography
                  variant="caption"
                  className="text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
                >
                  Within {localFilters.maxDistance} km
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails className="bg-white dark:bg-gray-900">
            <Box className="px-2 py-2">
              <Slider
                value={localFilters.maxDistance}
                onChange={handleDistanceChange}
                valueLabelDisplay="auto"
                min={0}
                max={20}
                step={0.5}
                valueLabelFormat={(value) => `${value} km`}
                className="mb-3"
                sx={{
                  color: "primary.main",
                  "& .MuiSlider-thumb": {
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  },
                }}
              />
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-400 font-medium"
              >
                Within {localFilters.maxDistance} km from city center
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Amenities */}
        <Accordion
          defaultExpanded
          className="border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm"
          elevation={0}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            className="bg-gray-50 dark:bg-gray-800 rounded-t-lg"
          >
            <Box className="flex items-center gap-2">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-900 dark:text-gray-100"
              >
                🏨 Amenities
              </Typography>
              {localFilters.amenities.length > 0 && (
                <Typography
                  variant="caption"
                  className="text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
                >
                  {localFilters.amenities.length} selected
                </Typography>
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails className="bg-white dark:bg-gray-900">
            <Box className="space-y-2 max-h-60 overflow-y-auto">
              {amenityOptions.map((amenity) => (
                <FormControlLabel
                  key={amenity}
                  control={
                    <Checkbox
                      checked={localFilters.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      size="small"
                      sx={{
                        color: "primary.main",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      className={`${
                        localFilters.amenities.includes(amenity)
                          ? "text-gray-900 dark:text-gray-100 font-medium"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {amenity}
                    </Typography>
                  }
                  className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded transition-colors"
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Action Buttons */}
        <Box className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg shadow-md"
            size="large"
          >
            Apply Filters
            {(localFilters.priceRange[0] > 0 ||
              localFilters.priceRange[1] < 500 ||
              localFilters.minRating > 0 ||
              localFilters.maxDistance < 10 ||
              localFilters.amenities.length > 0) && (
              <span className="ml-2 bg-white text-primary-600 px-2 py-0.5 rounded-full text-xs font-bold">
                {(localFilters.priceRange[0] > 0 ||
                localFilters.priceRange[1] < 500
                  ? 1
                  : 0) +
                  (localFilters.minRating > 0 ? 1 : 0) +
                  (localFilters.maxDistance < 10 ? 1 : 0) +
                  localFilters.amenities.length}
              </span>
            )}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearFilters}
            className="border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 rounded-lg"
          >
            Clear All Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );

  if (variant === "sidebar") {
    return (
      <Box className="hidden lg:block sticky top-6">
        <FilterContent />
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "persistent"}
      className={isMobile ? "lg:hidden" : "hidden lg:block"}
      PaperProps={{
        className: "w-80 max-w-[90vw]",
        sx: {
          backgroundColor: "background.default",
        },
      }}
      SlideProps={{
        direction: "right",
      }}
    >
      <FilterContent />
    </Drawer>
  );
}
