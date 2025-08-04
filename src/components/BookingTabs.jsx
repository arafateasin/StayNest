"use client";

import { useState } from "react";
import { Box, Tabs, Tab, Typography, Container, Paper } from "@mui/material";
import {
  Hotel,
  Flight,
  Attractions,
  LocalTaxi,
  BusinessCenter,
} from "@mui/icons-material";
import StaysSearchBar from "./StaysSearchBar.jsx";
import FlightsSearchBar from "./FlightsSearchBar.jsx";
import AttractionsSearchBar from "./AttractionsSearchBar.jsx";
import TaxisSearchBar from "./TaxisSearchBar.jsx";
import FlightHotelSearchBar from "./FlightHotelSearchBar.jsx";

const bookingTabs = [
  {
    id: "stays",
    label: "Stays",
    icon: <Hotel />,
    component: StaysSearchBar,
  },
  {
    id: "flights",
    label: "Flights",
    icon: <Flight />,
    component: FlightsSearchBar,
  },
  {
    id: "attractions",
    label: "Attractions",
    icon: <Attractions />,
    component: AttractionsSearchBar,
  },
  {
    id: "airport-taxis",
    label: "Airport taxis",
    icon: <LocalTaxi />,
    component: TaxisSearchBar,
  },
  {
    id: "flight-hotel",
    label: "Flight + Hotel",
    icon: <BusinessCenter />,
    component: FlightHotelSearchBar,
  },
];

export default function BookingTabs({ variant = "full", onSearch }) {
  const [activeTab, setActiveTab] = useState("stays");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const ActiveComponent = bookingTabs.find(
    (tab) => tab.id === activeTab
  )?.component;

  if (variant === "compact") {
    return (
      <Paper className="w-full bg-white dark:bg-gray-800 shadow-lg">
        <Box className="px-4 py-2">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            {bookingTabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                className="min-h-12 text-sm font-medium"
                sx={{
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box className="p-4">
          {ActiveComponent && (
            <ActiveComponent variant="compact" onSearch={onSearch} />
          )}
        </Box>
      </Paper>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <Box className="bg-primary-600 text-white p-6">
          <Typography variant="h4" className="font-bold mb-2">
            Find your next stay
          </Typography>
          <Typography variant="body1" className="opacity-90">
            Search deals on hotels, homes, and much more...
          </Typography>
        </Box>

        {/* Tabs */}
        <Box className="border-b border-gray-200 dark:border-gray-700">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className="px-6"
          >
            {bookingTabs.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
                className="min-h-16 text-base font-medium"
                sx={{
                  "&.Mui-selected": {
                    color: "primary.main",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Active Tab Content */}
        <Box className="p-6">
          {ActiveComponent && <ActiveComponent onSearch={onSearch} />}
        </Box>
      </Box>
    </Container>
  );
}
