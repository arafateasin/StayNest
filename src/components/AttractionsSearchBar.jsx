"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Search,
  Attractions,
  ConfirmationNumber,
  Smartphone,
  Cancel,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const popularAttractions = [
  "Petronas Twin Towers",
  "Universal Studios Singapore",
  "Gardens by the Bay",
  "Batu Caves",
  "Langkawi Cable Car",
  "Borobudur Temple",
];

const attractionCategories = [
  "Theme Parks",
  "Museums",
  "Tours",
  "Outdoor Activities",
  "Food & Drink",
  "Entertainment",
  "Shopping",
  "Wellness",
];

export default function AttractionsSearchBar({ variant = "full", onSearch }) {
  const [searchData, setSearchData] = useState({
    destination: "",
    date: null,
    category: "",
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        type: "attractions",
        ...searchData,
      });
    }
  };

  if (variant === "compact") {
    return (
      <Box className="flex flex-col lg:flex-row gap-2">
        <TextField
          fullWidth
          placeholder="Where are you going?"
          value={searchData.destination}
          onChange={(e) =>
            setSearchData((prev) => ({ ...prev, destination: e.target.value }))
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          className="lg:flex-1"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date"
            value={searchData.date}
            onChange={(date) => setSearchData((prev) => ({ ...prev, date }))}
            className="lg:w-40"
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          size="large"
          onClick={handleSearch}
          className="bg-primary-600 hover:bg-primary-700 px-8"
        >
          <Search />
        </Button>
      </Box>
    );
  }

  return (
    <Box className="space-y-4">
      {/* Popular Attractions */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Popular attractions:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {popularAttractions.map((attraction) => (
            <Chip
              key={attraction}
              label={attraction}
              variant="outlined"
              onClick={() =>
                setSearchData((prev) => ({ ...prev, destination: attraction }))
              }
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
            />
          ))}
        </Box>
      </Box>

      {/* Categories */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Browse by category:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {attractionCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              variant={searchData.category === category ? "filled" : "outlined"}
              onClick={() =>
                setSearchData((prev) => ({
                  ...prev,
                  category: prev.category === category ? "" : category,
                }))
              }
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
              color={searchData.category === category ? "primary" : "default"}
            />
          ))}
        </Box>
      </Box>

      {/* Main Search Form */}
      <Paper className="p-4 bg-gray-50 dark:bg-gray-700">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Destination */}
          <Box>
            <TextField
              fullWidth
              label="Destination"
              placeholder="Where are you going?"
              value={searchData.destination}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Attractions className="text-primary-600" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Date */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={searchData.date}
                onChange={(date) =>
                  setSearchData((prev) => ({ ...prev, date }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Search Button */}
          <Box className="flex items-end">
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              className="bg-primary-600 hover:bg-primary-700 h-14"
              startIcon={<Search />}
            >
              Search attractions
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Features */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Box>
          <Typography
            variant="h6"
            className="font-semibold mb-1 flex items-center justify-center gap-2"
          >
            <Smartphone sx={{ color: "#607d8b" }} />
            Instant booking
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Book instantly and skip the lines
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            className="font-semibold mb-1 flex items-center gap-2"
          >
            <ConfirmationNumber sx={{ color: "#9c27b0" }} />
            Mobile tickets
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Show your phone at the entrance
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            className="font-semibold mb-1 flex items-center justify-center gap-2"
          >
            <Cancel sx={{ color: "#4caf50" }} />
            Free cancellation
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Cancel up to 24 hours in advance
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
