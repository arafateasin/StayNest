"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  MenuItem,
  IconButton,
  Chip,
} from "@mui/material";
import {
  LocationOn,
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
  "Kuala Lumpur, Malaysia",
  "Singapore",
  "Bangkok, Thailand",
  "Jakarta, Indonesia",
  "Manila, Philippines",
  "Ho Chi Minh City, Vietnam",
];

export default function StaysSearchBar({ variant = "full", onSearch }) {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        type: "stays",
        ...searchData,
      });
    }
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
            label="Check-in"
            value={searchData.checkIn}
            onChange={(date) =>
              setSearchData((prev) => ({ ...prev, checkIn: date }))
            }
            className="lg:w-40"
          />
          <DatePicker
            label="Check-out"
            value={searchData.checkOut}
            onChange={(date) =>
              setSearchData((prev) => ({ ...prev, checkOut: date }))
            }
            className="lg:w-40"
          />
        </LocalizationProvider>

        <TextField
          label="Guests"
          value={`${searchData.adults + searchData.children} guests, ${
            searchData.rooms
          } room${searchData.rooms > 1 ? "s" : ""}`}
          className="lg:w-40"
          InputProps={{
            readOnly: true,
          }}
          onClick={() => setShowGuestSelector(!showGuestSelector)}
        />

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
      {/* Popular Destinations */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Popular destinations:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {popularDestinations.map((destination) => (
            <Chip
              key={destination}
              label={destination}
              variant="outlined"
              onClick={() =>
                setSearchData((prev) => ({ ...prev, destination }))
              }
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
            />
          ))}
        </Box>
      </Box>

      {/* Main Search Form */}
      <Paper className="p-4 bg-gray-50 dark:bg-gray-700">
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <Box className="md:col-span-2">
            <TextField
              fullWidth
              label="Where are you going?"
              placeholder="Destination, property name or address"
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
                    <LocationOn className="text-primary-600" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Check-in */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-in date"
                value={searchData.checkIn}
                onChange={(date) =>
                  setSearchData((prev) => ({ ...prev, checkIn: date }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Check-out */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-out date"
                value={searchData.checkOut}
                onChange={(date) =>
                  setSearchData((prev) => ({ ...prev, checkOut: date }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Guests */}
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

          {/* Search Button */}
          <Box className="flex items-end">
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              className="bg-primary-600 hover:bg-primary-700 h-14 text-lg font-semibold"
              startIcon={<Search />}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Additional Options */}
      <Box className="text-center">
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400"
        >
          Looking for flights?{" "}
          <span className="text-primary-600 cursor-pointer hover:underline">
            Search flights
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
