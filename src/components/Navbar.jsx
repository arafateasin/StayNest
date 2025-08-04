"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  DarkMode,
  LightMode,
  Person,
  Home,
  Search,
  Login,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useTheme as useCustomTheme } from "../lib/ThemeContext.jsx";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const { darkMode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    { text: "Home", href: "/", icon: <Home /> },
    { text: "Search", href: "/search", icon: <Search /> },
  ];

  const MobileMenu = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      className="md:hidden"
    >
      <Box sx={{ width: 250 }} role="presentation">
        <Box className="p-4">
          <Link href="/" className="flex items-center justify-center">
            <img
              src="/staynestlogo.png"
              alt="StayNest"
              className="w-auto h-8"
            />
          </Link>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              href={item.href}
              onClick={toggleMobileMenu}
            >
              <Box className="flex items-center gap-3">
                {item.icon}
                <ListItemText primary={item.text} />
              </Box>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <Button
              variant="outlined"
              startIcon={<Login />}
              fullWidth
              className="mt-2"
            >
              Sign In
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="contained" fullWidth className="mt-2">
              Sign Up
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        className="bg-white shadow-sm dark:bg-gray-800"
        color="inherit"
      >
        <Toolbar className="w-full px-4 mx-auto max-w-7xl">
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
              className="mr-2 md:hidden"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/staynestlogo.png"
              alt="StayNest"
              className="w-auto h-8 transition-opacity sm:h-10 md:h-12 hover:opacity-80"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box className="items-center hidden gap-6 ml-8 md:flex">
              {menuItems.map((item) => (
                <Link key={item.text} href={item.href}>
                  <Button
                    color="inherit"
                    className="text-gray-700 transition-colors dark:text-gray-200 hover:text-primary-600"
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit" className="mr-2">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>

          {/* Desktop Auth Buttons */}
          {!isMobile && (
            <Box className="items-center hidden gap-2 md:flex">
              <Button variant="outlined" color="primary" className="mr-2">
                Sign In
              </Button>
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </Box>
          )}

          {/* Profile Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            className="ml-2"
          >
            <Avatar className="w-8 h-8 bg-primary-500">
              <Person />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Bookings</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>

      {/* Mobile Menu */}
      {MobileMenu}
    </>
  );
}
