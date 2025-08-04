"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  useMediaQuery,
  Skeleton,
  Card,
  CardContent,
  CardMedia,
  Rating,
  CircularProgress,
} from "@mui/material";
import {
  FilterList,
  ViewList,
  ViewModule,
  Sort,
  LocationOn,
  Star,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/Navbar.jsx";
import BookingTabs from "../../components/BookingTabs.jsx";
import HotelCard from "../../components/HotelCard.jsx";
import FilterSidebar from "../../components/FilterSidebar.jsx";
import {
  mockHotels,
  filterHotels,
  sortHotels,
  searchStays,
  searchFlights,
  searchAttractions,
  searchTaxis,
  searchFlightHotelPackages,
} from "../../lib/mockData.jsx";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [hotels, setHotels] = useState([]);
  const [results, setResults] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchType, setSearchType] = useState("stays");
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    minRating: 0,
    maxDistance: 10,
    amenities: [],
  });

  useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      const type = searchParams.get("type") || "stays";
      setSearchType(type);

      let searchResults = [];

      try {
        switch (type) {
          case "stays":
            const location = searchParams.get("location") || "";
            const checkIn = searchParams.get("checkIn");
            const checkOut = searchParams.get("checkOut");
            const adults = parseInt(searchParams.get("adults")) || 2;
            const children = parseInt(searchParams.get("children")) || 0;
            const rooms = parseInt(searchParams.get("rooms")) || 1;

            searchResults = await searchStays({
              destination: location,
              checkIn: checkIn ? new Date(checkIn) : new Date(),
              checkOut: checkOut
                ? new Date(checkOut)
                : new Date(Date.now() + 86400000),
              adults,
              children,
              rooms,
            });

            // For backward compatibility, also set hotels
            setHotels(searchResults);
            setFilteredHotels(searchResults);
            break;

          case "flights":
            const from = searchParams.get("from") || "";
            const to = searchParams.get("to") || "";
            const departDate = searchParams.get("departDate");
            const returnDate = searchParams.get("returnDate");

            searchResults = await searchFlights({
              from,
              to,
              departDate: departDate ? new Date(departDate) : new Date(),
              returnDate: returnDate ? new Date(returnDate) : null,
            });
            break;

          case "attractions":
            searchResults = await searchAttractions({
              location: searchParams.get("location") || "",
            });
            break;

          case "airport-taxis":
            searchResults = await searchTaxis({
              pickup: searchParams.get("pickup") || "",
              destination: searchParams.get("destination") || "",
            });
            break;

          case "flight-hotel":
            searchResults = await searchFlightHotelPackages({
              from: searchParams.get("from") || "",
              to: searchParams.get("to") || "",
            });
            break;

          default:
            // Fallback to stays
            searchResults = await searchStays({
              destination: searchParams.get("location") || "",
            });
            setHotels(searchResults);
            setFilteredHotels(searchResults);
        }

        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }

      setLoading(false);
    };

    loadResults();
  }, [searchParams]);

  useEffect(() => {
    if (searchType === "stays") {
      const filtered = filterHotels(hotels, filters);
      const sorted = sortHotels(filtered, sortBy);
      setFilteredHotels(sorted);
    }
  }, [hotels, filters, sortBy, searchType]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = (searchData) => {
    // Simulate search with new parameters
    console.log("New search:", searchData);
  };

  const renderResultCard = (item, index) => {
    switch (searchType) {
      case "stays":
        return <HotelCard key={item.id || index} hotel={item} />;

      case "flights":
        return (
          <Card
            key={index}
            className="mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Box className="flex items-center gap-4">
                  <Typography variant="h6" className="font-semibold">
                    {item.airline}
                  </Typography>
                  <Chip label={item.flightNumber} size="small" />
                </Box>
                <Typography variant="h5" className="font-bold text-primary-600">
                  ${item.price}
                </Typography>
              </Box>

              <Box className="flex justify-between items-center mb-2">
                <Box>
                  <Typography variant="h6">{item.departTime}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {item.from}
                  </Typography>
                </Box>
                <Box className="text-center">
                  <Typography variant="body2" className="text-gray-500">
                    {item.duration}
                  </Typography>
                  <Box className="w-20 h-px bg-gray-300 my-1"></Box>
                  <Typography variant="body2" className="text-gray-500">
                    {item.stops === 0
                      ? "Direct"
                      : `${item.stops} stop${item.stops > 1 ? "s" : ""}`}
                  </Typography>
                </Box>
                <Box className="text-right">
                  <Typography variant="h6">{item.arriveTime}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {item.to}
                  </Typography>
                </Box>
              </Box>

              <Box className="flex justify-between items-center mt-4">
                <Typography variant="body2" className="text-gray-600">
                  {item.cabinClass} • {item.aircraft}
                </Typography>
                <Button variant="contained" size="small">
                  Select Flight
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case "attractions":
        return (
          <Card
            key={index}
            className="h-full hover:shadow-lg transition-shadow duration-300"
          >
            <CardMedia
              component="img"
              height="200"
              image={
                item.image ||
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
              }
              alt={item.name}
              className="h-48 object-cover"
            />
            <CardContent className="flex-1 flex flex-col">
              <Typography variant="h6" className="font-semibold mb-2">
                {item.name}
              </Typography>
              <Box className="flex items-center gap-1 mb-2">
                <LocationOn className="text-gray-500 text-sm" />
                <Typography variant="body2" className="text-gray-600">
                  {item.location}
                </Typography>
              </Box>
              <Box className="flex items-center gap-1 mb-2">
                <Star className="text-yellow-400 text-sm" />
                <Typography variant="body2">{item.rating}</Typography>
              </Box>
              <Typography variant="body2" className="text-gray-600 mb-3 flex-1">
                {item.description}
              </Typography>
              <Box className="flex justify-between items-center">
                <Typography variant="h6" className="font-bold text-primary-600">
                  ${item.price}
                </Typography>
                <Button variant="contained" size="small">
                  Book Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        );

      case "airport-taxis":
        return (
          <Card
            key={index}
            className="mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold">
                  {item.vehicleType}
                </Typography>
                <Typography variant="h5" className="font-bold text-primary-600">
                  ${item.price}
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-600 mb-2">
                {item.company} • {item.passengers} passengers • {item.luggage}{" "}
                luggage
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                Duration: {item.duration} • Distance: {item.distance}
              </Typography>
              <Button variant="contained" size="small" fullWidth>
                Book Taxi
              </Button>
            </CardContent>
          </Card>
        );

      case "flight-hotel":
        return (
          <Card
            key={index}
            className="mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent>
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold">
                  Flight + Hotel Package
                </Typography>
                <Typography variant="h5" className="font-bold text-primary-600">
                  ${item.totalPrice}
                </Typography>
              </Box>
              <Typography variant="body1" className="font-medium mb-2">
                {item.destination}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-2">
                From: {item.from} •{" "}
                {item.includes
                  ? item.includes.join(" • ")
                  : "Flight + Hotel Package"}
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-3">
                Duration: {item.duration} • Savings: ${item.savings}
              </Typography>
              <Button variant="contained" size="small" fullWidth>
                Book Package
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const getSearchParams = () => {
    return {
      location: searchParams.get("location") || "",
      checkIn: searchParams.get("checkIn") || "",
      checkOut: searchParams.get("checkOut") || "",
      guests: searchParams.get("guests") || "2",
    };
  };

  const activeFiltersCount =
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 500 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.maxDistance < 10 ? 1 : 0) +
    filters.amenities.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Search Bar */}
      <Box className="bg-white dark:bg-gray-800 shadow-sm py-4">
        <Container maxWidth="lg">
          <BookingTabs variant="compact" onSearch={handleSearch} />
        </Container>
      </Box>

      <Container maxWidth="lg" className="py-4 sm:py-6">
        {/* Main Content */}
        <div className="w-full px-4 sm:px-0">
          {/* Results Header */}
          <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
            <Box>
              <Typography
                variant="h5"
                className="font-bold text-gray-900 dark:text-gray-100 mb-1 text-xl sm:text-2xl"
              >
                {getSearchParams().location || "All Destinations"}
              </Typography>
              <Typography
                variant="body2"
                className="text-gray-600 dark:text-gray-400 text-sm sm:text-base"
              >
                {loading
                  ? "Searching..."
                  : searchType === "stays"
                  ? `${filteredHotels.length} properties found`
                  : `${results.length} results found`}
              </Typography>
            </Box>

            <Box className="flex items-center gap-2 flex-wrap">
              {/* Mobile Filter Button - Only for stays */}
              {searchType === "stays" && (
                <Button
                  variant="outlined"
                  startIcon={<FilterList />}
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden text-xs sm:text-sm"
                  size="small"
                >
                  Filters
                  {activeFiltersCount > 0 && (
                    <Chip
                      label={activeFiltersCount}
                      size="small"
                      className="ml-2 bg-primary-600 text-white"
                    />
                  )}
                </Button>
              )}

              {/* Sort */}
              <FormControl size="small" className="min-w-24 sm:min-w-32">
                <InputLabel className="text-xs sm:text-sm">Sort by</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort by"
                  onChange={handleSortChange}
                  className="text-xs sm:text-sm"
                >
                  <MenuItem value="featured">Featured</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Highest Rated</MenuItem>
                  <MenuItem value="distance">Distance</MenuItem>
                </Select>
              </FormControl>

              {/* View Mode */}
              <Box className="flex border rounded">
                <IconButton
                  size="small"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid" ? "bg-primary-100 text-primary-600" : ""
                  }
                >
                  <ViewModule />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list" ? "bg-primary-100 text-primary-600" : ""
                  }
                >
                  <ViewList />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Results Grid/List */}
          {loading ? (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              } gap-4 sm:gap-6`}
            >
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={viewMode === "grid" ? 250 : 180}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Render results based on search type */}
              {searchType === "stays" ? (
                <div
                  className={`grid ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  } gap-4 sm:gap-6`}
                >
                  {filteredHotels.map((hotel) => (
                    <div key={hotel.id}>
                      <HotelCard hotel={hotel} variant={viewMode} />
                    </div>
                  ))}
                </div>
              ) : searchType === "flights" ? (
                <Box>
                  {results.map((item, index) => renderResultCard(item, index))}
                </Box>
              ) : searchType === "attractions" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((item, index) => (
                    <div key={index}>{renderResultCard(item, index)}</div>
                  ))}
                </div>
              ) : (
                <Box>
                  {results.map((item, index) => renderResultCard(item, index))}
                </Box>
              )}
            </>
          )}

          {/* No Results */}
          {!loading &&
            (searchType === "stays"
              ? filteredHotels.length === 0
              : results.length === 0) && (
              <Box className="text-center py-8 sm:py-12 px-4">
                <Typography
                  variant="h6"
                  className="text-gray-600 dark:text-gray-400 mb-2 text-lg sm:text-xl"
                >
                  No results found
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-500 dark:text-gray-500 mb-4 text-sm sm:text-base"
                >
                  Try adjusting your filters or search criteria
                </Typography>
                <Button
                  variant="contained"
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 500],
                      minRating: 0,
                      maxDistance: 10,
                      amenities: [],
                    })
                  }
                >
                  Clear Filters
                </Button>
              </Box>
            )}
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        variant="drawer"
      />
    </div>
  );
}
