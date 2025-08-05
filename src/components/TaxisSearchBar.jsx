"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  Flight,
  CalendarToday,
  AccessTime,
  Search,
  LocalTaxi,
  SwapVert,
  DirectionsCar,
  AirportShuttle,
  DriveEta,
  TrackChanges,
  AttachMoney,
  Schedule,
} from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const popularAirports = [
  "Kuala Lumpur International Airport (KUL)",
  "Singapore Changi Airport (SIN)",
  "Bangkok Suvarnabhumi Airport (BKK)",
  "Jakarta Soekarno-Hatta Airport (CGK)",
];

const vehicleTypes = [
  {
    value: "economy",
    label: "Economy",
    capacity: "1-3 passengers",
    icon: <DirectionsCar className="text-2xl text-blue-600" />,
  },
  {
    value: "comfort",
    label: "Comfort",
    capacity: "1-4 passengers",
    icon: <DriveEta className="text-2xl text-green-600" />,
  },
  {
    value: "premium",
    label: "Premium",
    capacity: "1-3 passengers",
    icon: <LocalTaxi className="text-2xl text-yellow-600" />,
  },
  {
    value: "van",
    label: "Van",
    capacity: "1-8 passengers",
    icon: <AirportShuttle className="text-2xl text-purple-600" />,
  },
];

export default function TaxisSearchBar({ variant = "full", onSearch }) {
  const [searchData, setSearchData] = useState({
    tripType: "one-way",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: null,
    returnDateTime: null,
    vehicleType: "economy",
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        type: "airport-taxis",
        ...searchData,
      });
    }
  };

  const swapLocations = () => {
    setSearchData((prev) => ({
      ...prev,
      pickupLocation: prev.dropoffLocation,
      dropoffLocation: prev.pickupLocation,
    }));
  };

  if (variant === "compact") {
    return (
      <Box className="flex flex-col lg:flex-row gap-2">
        <TextField
          placeholder="Pickup location"
          value={searchData.pickupLocation}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              pickupLocation: e.target.value,
            }))
          }
          className="lg:flex-1"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn className="text-gray-400" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          placeholder="Drop-off location"
          value={searchData.dropoffLocation}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              dropoffLocation: e.target.value,
            }))
          }
          className="lg:flex-1"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Pickup time"
            value={searchData.pickupDateTime}
            onChange={(dateTime) =>
              setSearchData((prev) => ({ ...prev, pickupDateTime: dateTime }))
            }
            className="lg:w-48"
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
      {/* Trip Type */}
      <Box>
        <ToggleButtonGroup
          value={searchData.tripType}
          exclusive
          onChange={(e, value) =>
            value && setSearchData((prev) => ({ ...prev, tripType: value }))
          }
          className="mb-4"
        >
          <ToggleButton value="one-way" className="px-6">
            One way
          </ToggleButton>
          <ToggleButton value="return" className="px-6">
            Return
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Popular Airports */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Popular airports:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {popularAirports.map((airport) => (
            <Chip
              key={airport}
              label={airport.split(" (")[0]}
              variant="outlined"
              onClick={() =>
                setSearchData((prev) => ({ ...prev, pickupLocation: airport }))
              }
              className="cursor-pointer hover:bg-primary-50 hover:border-primary-300"
            />
          ))}
        </Box>
      </Box>

      {/* Main Search Form */}
      <Paper className="p-4 bg-gray-50 dark:bg-gray-700">
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Pickup Location */}
          <Box className="relative">
            <TextField
              fullWidth
              label="Pickup location"
              placeholder="Airport, hotel, address"
              value={searchData.pickupLocation}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  pickupLocation: e.target.value,
                }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Flight className="text-primary-600" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Swap Button */}
          <Box className="flex justify-center items-center">
            <Button
              onClick={swapLocations}
              className="min-w-12 h-12 rounded-full border border-gray-300 dark:border-gray-600"
              variant="outlined"
              size="small"
            >
              <SwapVert />
            </Button>
          </Box>

          {/* Drop-off Location */}
          <Box>
            <TextField
              fullWidth
              label="Drop-off location"
              placeholder="Airport, hotel, address"
              value={searchData.dropoffLocation}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  dropoffLocation: e.target.value,
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
        </Box>

        <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {/* Pickup Date & Time */}
          <Box className="md:col-span-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Pickup date & time"
                value={searchData.pickupDateTime}
                onChange={(dateTime) =>
                  setSearchData((prev) => ({
                    ...prev,
                    pickupDateTime: dateTime,
                  }))
                }
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Return Date & Time */}
          {searchData.tripType === "return" && (
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Return date & time"
                  value={searchData.returnDateTime}
                  onChange={(dateTime) =>
                    setSearchData((prev) => ({
                      ...prev,
                      returnDateTime: dateTime,
                    }))
                  }
                  fullWidth
                />
              </LocalizationProvider>
            </Box>
          )}

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
              Search
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Vehicle Types */}
      <Box>
        <Typography variant="h6" className="font-semibold mb-3">
          Choose your vehicle
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {vehicleTypes.map((vehicle) => (
            <Paper
              key={vehicle.value}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                searchData.vehicleType === vehicle.value
                  ? "border-2 border-primary-500 bg-primary-50 dark:bg-primary-900"
                  : "border border-gray-200 dark:border-gray-700"
              }`}
              onClick={() =>
                setSearchData((prev) => ({
                  ...prev,
                  vehicleType: vehicle.value,
                }))
              }
            >
              <Box className="text-center">
                <Box className="mb-3 flex justify-center">{vehicle.icon}</Box>
                <Typography variant="subtitle1" className="font-semibold">
                  {vehicle.label}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 dark:text-gray-400"
                >
                  {vehicle.capacity}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Features */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <Box>
          <Box className="flex justify-center mb-2">
            <TrackChanges className="text-3xl text-blue-600" />
          </Box>
          <Typography variant="h6" className="font-semibold mb-1">
            Flight tracking
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Driver monitors your flight
          </Typography>
        </Box>
        <Box>
          <Box className="flex justify-center mb-2">
            <AttachMoney className="text-3xl text-green-600" />
          </Box>
          <Typography variant="h6" className="font-semibold mb-1">
            Fixed prices
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            No hidden costs or surprises
          </Typography>
        </Box>
        <Box>
          <Box className="flex justify-center mb-2">
            <Schedule className="text-3xl text-purple-600" />
          </Box>
          <Typography variant="h6" className="font-semibold mb-1">
            24/7 service
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-400"
          >
            Available around the clock
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
