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
  IconButton,
  Chip,
} from "@mui/material";
import {
  Flight,
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

const popularRoutes = [
  { from: "Kuala Lumpur (KUL)", to: "Singapore (SIN)" },
  { from: "Kuala Lumpur (KUL)", to: "Bangkok (BKK)" },
  { from: "Kuala Lumpur (KUL)", to: "Jakarta (CGK)" },
  { from: "Singapore (SIN)", to: "Bangkok (BKK)" },
];

const cabinClasses = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium Economy" },
  { value: "business", label: "Business" },
  { value: "first", label: "First Class" },
];

export default function FlightsSearchBar({ variant = "full", onSearch }) {
  const [searchData, setSearchData] = useState({
    tripType: "roundtrip",
    from: "",
    to: "",
    departDate: null,
    returnDate: null,
    passengers: 1,
    cabinClass: "economy",
  });

  const [showPassengerSelector, setShowPassengerSelector] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        type: "flights",
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

  const updatePassengers = (operation) => {
    setSearchData((prev) => ({
      ...prev,
      passengers:
        operation === "add"
          ? prev.passengers + 1
          : Math.max(1, prev.passengers - 1),
    }));
  };

  if (variant === "compact") {
    return (
      <Box className="flex flex-col lg:flex-row gap-2">
        <TextField
          placeholder="From"
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
          placeholder="To"
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
          <ToggleButton value="roundtrip" className="px-6">
            Round trip
          </ToggleButton>
          <ToggleButton value="oneway" className="px-6">
            One way
          </ToggleButton>
          <ToggleButton value="multicity" className="px-6">
            Multi-city
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Popular Routes */}
      <Box>
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400 mb-2"
        >
          Popular routes:
        </Typography>
        <Box className="flex flex-wrap gap-2">
          {popularRoutes.map((route, index) => (
            <Chip
              key={index}
              label={`${route.from} → ${route.to}`}
              variant="outlined"
              onClick={() =>
                setSearchData((prev) => ({
                  ...prev,
                  from: route.from,
                  to: route.to,
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
              placeholder=""
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "56px",
                },
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
              placeholder=""
              value={searchData.to}
              onChange={(e) =>
                setSearchData((prev) => ({ ...prev, to: e.target.value }))
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Flight className="text-primary-600 transform rotate-45" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "56px",
                },
              }}
            />
          </Box>

          {/* Search Button */}
          <Box className="flex items-end h-14">
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

        <Box className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
                disabled={searchData.tripType === "oneway"}
                fullWidth
              />
            </LocalizationProvider>
          </Box>

          {/* Passengers */}
          <Box className="relative">
            <TextField
              fullWidth
              label="Passengers"
              value={`${searchData.passengers} passenger${
                searchData.passengers > 1 ? "s" : ""
              }`}
              onClick={() => setShowPassengerSelector(!showPassengerSelector)}
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

            {showPassengerSelector && (
              <Paper className="absolute top-full left-0 right-0 z-10 mt-1 p-4">
                <Box className="flex items-center justify-between">
                  <Typography>Passengers</Typography>
                  <Box className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      onClick={() => updatePassengers("remove")}
                      disabled={searchData.passengers <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography className="w-8 text-center">
                      {searchData.passengers}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updatePassengers("add")}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setShowPassengerSelector(false)}
                  className="bg-primary-600 hover:bg-primary-700 mt-3"
                >
                  Done
                </Button>
              </Paper>
            )}
          </Box>

          {/* Cabin Class */}
          <Box>
            <TextField
              fullWidth
              select
              label="Cabin class"
              value={searchData.cabinClass}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  cabinClass: e.target.value,
                }))
              }
            >
              {cabinClasses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
        </Box>
      </Paper>

      {/* Additional Options */}
      <Box className="text-center">
        <Typography
          variant="body2"
          className="text-gray-600 dark:text-gray-400"
        >
          Looking for stays?{" "}
          <span className="text-primary-600 cursor-pointer hover:underline">
            Search hotels
          </span>
        </Typography>
      </Box>
    </Box>
  );
}
