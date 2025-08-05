"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  Button,
  Popover,
  Typography,
  Grid,
  Chip,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn,
  CalendarToday,
  Person,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const popularDestinations = [
  "New York, NY",
  "Miami Beach, FL",
  "San Francisco, CA",
  "Los Angeles, CA",
  "Chicago, IL",
  "Boston, MA",
  "Seattle, WA",
  "Austin, TX",
];

export default function SearchBar({ variant = "default", onSearch }) {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const [locationAnchor, setLocationAnchor] = useState(null);
  const [guestsAnchor, setGuestsAnchor] = useState(null);
  const router = useRouter();

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      location: location || "",
      checkIn: checkIn ? checkIn.toISOString() : "",
      checkOut: checkOut ? checkOut.toISOString() : "",
      guests: guests.toString(),
    });

    if (onSearch) {
      onSearch({ location, checkIn, checkOut, guests });
    } else {
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  const handleLocationClick = (destination) => {
    setLocation(destination);
    setLocationAnchor(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (variant === "compact") {
    return (
      <Paper
        component="form"
        className="p-2 flex items-center w-full max-w-md mx-auto shadow-md"
        elevation={3}
      >
        <InputBase
          className="ml-2 flex-1"
          placeholder="Search destination..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton
          type="button"
          className="p-2"
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        className="p-3 sm:p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg mx-2 sm:mx-0"
      >
        <Grid container spacing={{ xs: 1, sm: 2 }} alignItems="center">
          {/* Location */}
          <Grid xs={12} md={3}>
            <Box className="relative">
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LocationOn />}
                onClick={(e) => setLocationAnchor(e.currentTarget)}
                className="justify-start text-left h-12 sm:h-14"
              >
                <Box className="flex-1 text-left">
                  <Typography
                    variant="caption"
                    className="text-gray-500 block text-xs sm:text-sm"
                  >
                    Where
                  </Typography>
                  <Typography
                    variant="body2"
                    className="truncate text-sm sm:text-base"
                  >
                    {location || "Search destinations"}
                  </Typography>
                </Box>
              </Button>

              <Popover
                open={Boolean(locationAnchor)}
                anchorEl={locationAnchor}
                onClose={() => setLocationAnchor(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                className="mt-2"
              >
                <Box className="p-4 w-80">
                  <InputBase
                    fullWidth
                    placeholder="Search destinations"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mb-3 p-2 bg-gray-100 rounded"
                  />
                  <Typography variant="subtitle2" className="mb-2 font-medium">
                    Popular destinations
                  </Typography>
                  <Box className="flex flex-wrap gap-1">
                    {popularDestinations.map((dest) => (
                      <Chip
                        key={dest}
                        label={dest}
                        onClick={() => handleLocationClick(dest)}
                        className="mb-1 cursor-pointer hover:bg-primary-100"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              </Popover>
            </Box>
          </Grid>

          {/* Check-in */}
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Check-in"
              value={checkIn}
              onChange={setCheckIn}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  className: "h-12 sm:h-14",
                  size: "small",
                },
              }}
            />
          </Grid>

          {/* Check-out */}
          <Grid xs={12} sm={6} md={2}>
            <DatePicker
              label="Check-out"
              value={checkOut}
              onChange={setCheckOut}
              minDate={checkIn}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  className: "h-12 sm:h-14",
                  size: "small",
                },
              }}
            />
          </Grid>

          {/* Guests */}
          <Grid xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Person />}
              onClick={(e) => setGuestsAnchor(e.currentTarget)}
              className="justify-start text-left h-12 sm:h-14"
            >
              <Box className="flex-1 text-left">
                <Typography
                  variant="caption"
                  className="text-gray-500 block text-xs"
                >
                  Who
                </Typography>
                <Typography variant="body2" className="text-sm">
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </Typography>
              </Box>
            </Button>

            <Popover
              open={Boolean(guestsAnchor)}
              anchorEl={guestsAnchor}
              onClose={() => setGuestsAnchor(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              className="mt-2"
            >
              <Box className="p-4 w-64">
                <Typography variant="subtitle2" className="mb-3 font-medium">
                  Guests
                </Typography>
                <Box className="flex items-center justify-between">
                  <Typography variant="body2">Adults</Typography>
                  <Box className="flex items-center gap-3">
                    <IconButton
                      size="small"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </IconButton>
                    <Typography variant="body1" className="w-8 text-center">
                      {guests}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setGuests(Math.min(10, guests + 1))}
                      disabled={guests >= 10}
                    >
                      +
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Popover>
          </Grid>

          {/* Search Button */}
          <Grid xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              className="h-12 sm:h-14 bg-accent-600 hover:bg-accent-700 text-white font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
}
