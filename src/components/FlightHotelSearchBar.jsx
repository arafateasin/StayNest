"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import {
  Flight,
  Hotel,
  SwapHoriz,
  CalendarToday,
  Person,
  Search,
  Add,
  Remove,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const popularDestinations = [
  { from: "Kuala Lumpur", to: "Tokyo" },
  { from: "Singapore", to: "Paris" },
  { from: "Bangkok", to: "London" },
  { from: "Jakarta", to: "Dubai" },
];

export default function FlightHotelSearchBar({ variant = "full", onSearch }) {
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: null,
    returnDate: null,
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        type: "flight-hotel",
        ...searchData,
      });
    }
  };

  const swapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const updateGuests = (type, operation) => {
    setSearchData((prev) => ({
      ...prev,
      [type]:
        operation === "add"
          ? prev[type] + 1
          : Math.max(type === "adults" ? 1 : 0, prev[type] - 1),
    }));
  };

  if (variant === "compact") {
    return (
      <Box className="flex flex-col lg:flex-row gap-2">
        <TextField
          placeholder="Flying from"
          value={searchData.from}
          onChange={(e) =>
            setSearchData((prev) => ({ ...prev, from: e.target.value }))
          }
          className="lg:flex-1"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Flight className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder="Flying to"
          value={searchData.to}
          onChange={(e) =>
            setSearchData((prev) => ({ ...prev, to: e.target.value }))
          }
          className="lg:flex-1"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Depart"
            value={searchData.departDate}
            onChange={(date) =>
              setSearchData((prev) => ({ ...prev, departDate: date }))
            }
            className="lg:w-40"
          />
          <DatePicker
            label="Return"
            value={searchData.returnDate}
            onChange={(date) =>
              setSearchData((prev) => ({ ...prev, returnDate: date }))
            }
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
      {/* Package Benefits */}
      <Box className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 p-4 rounded-lg">
        <Typography
          variant="h6"
          className="font-semibold mb-2 text-blue-800 dark:text-blue-200"
        >
          ✈️ + 🏨 Save more when you book together
        </Typography>
        <Typography
          variant="body2"
          className="text-blue-700 dark:text-blue-300"
        >
          Book your flight and hotel together and save up to 20% compared to
          booking separately
        </Typography>
      </Box>

      {/* Popular Packages */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Popular packages:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {popularDestinations.map((destination, index) => (
            <Chip
              key={index}
              label={`${destination.from} → ${destination.to}`}
              variant="outlined"
              onClick={() =>
                setSearchData((prev) => ({
                  ...prev,
                  from: destination.from,
                  to: destination.to,
                }))
              }
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
            />
          ))}
        </Box>
      </Box>

      {/* Main Search Form */}
      <Paper className="p-4 bg-gray-50 dark:bg-gray-700">
        <Box className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* From */}
          <Box className="md:col-span-2 relative">
            <TextField
              fullWidth
              label="Flying from"
              placeholder="Country, city or airport"
              value={searchData.from}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, from: e.target.value }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Flight className="text-primary-600" />
                  </InputAdornment>
                ),
              }}
            />

            {/* Swap Button */}
            <IconButton
              onClick={swapLocations}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md z-10"
              size="small"
            >
              <SwapHoriz className="text-primary-600" />
            </IconButton>
          </Box>

          {/* To */}
          <Box className="md:col-span-2">
            <TextField
              fullWidth
              label="Flying to"
              placeholder="Country, city or airport"
              value={searchData.to}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </Box>

          {/* Search Button */}
          <Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              className="bg-primary-600 hover:bg-primary-700 h-14"
              startIcon={<Search />}
            >
              Search
            </Button>
          </Box>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Depart Date */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Depart"
                value={searchData.departDate}
                onChange={(date) =>
                  setSearchData((prev) => ({ ...prev, departDate: date }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Return Date */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Return"
                value={searchData.returnDate}
                onChange={(date) =>
                  setSearchData((prev) => ({ ...prev, returnDate: date }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Guests & Rooms */}
          <Box className="relative">
            <TextField
              fullWidth
              label="Guests and rooms"
              value={`${searchData.adults} adults · ${searchData.children} children · ${searchData.rooms} room`}
              onClick={() => setShowGuestSelector(!showGuestSelector)}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="text-primary-600" />
                  </InputAdornment>
                ),
              }}
              className="cursor-pointer"
            />

            {showGuestSelector && (
              <Paper className="absolute top-full left-0 right-0 z-10 mt-1 p-4 space-y-4">
                <Box className="flex items-center justify-between">
                  <Typography>Adults</Typography>
                  <Box className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("adults", "remove")}
                      disabled={searchData.adults <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="w-8 text-center">
                      {searchData.adults}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("adults", "add")}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                <Box className="flex items-center justify-between">
                  <Typography>Children</Typography>
                  <Box className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("children", "remove")}
                      disabled={searchData.children <= 0}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="w-8 text-center">
                      {searchData.children}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("children", "add")}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                <Box className="flex items-center justify-between">
                  <Typography>Rooms</Typography>
                  <Box className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("rooms", "remove")}
                      disabled={searchData.rooms <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="w-8 text-center">
                      {searchData.rooms}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateGuests("rooms", "add")}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowGuestSelector(false)}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Done
                </Button>
              </Paper>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Package Features */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Box>
          <Typography variant="h6" className="font-semibold mb-1">
            💰 Best price guarantee
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            We&apos;ll match any lower price
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" className="font-semibold mb-1">
            🎯 One-stop booking
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Book flight and hotel together
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" className="font-semibold mb-1">
            🎁 Extra savings
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Save up to 20% on packages
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
