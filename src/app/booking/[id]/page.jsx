"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Alert,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  LocationOn,
  CalendarToday,
  Person,
  CreditCard,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Navbar from "../../../components/Navbar.jsx";
import { mockHotels } from "../../../lib/mockData.jsx";

const steps = [
  "Dates & Guests",
  "Guest Information",
  "Payment",
  "Confirmation",
];

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const [hotel, setHotel] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000)
  );
  const [guests, setGuests] = useState(2);
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    const foundHotel = mockHotels.find((h) => h.id === parseInt(params.id));
    setHotel(foundHotel);
  }, [params.id]);

  const calculateNights = () => {
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const calculateTotal = () => {
    if (!hotel) return 0;
    const nights = calculateNights();
    const subtotal = hotel.price * nights;
    const taxes = subtotal * 0.15;
    return subtotal + taxes;
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Complete booking
      setBookingComplete(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return checkIn && checkOut && guests > 0;
      case 1:
        return (
          guestInfo.firstName &&
          guestInfo.lastName &&
          guestInfo.email &&
          guestInfo.phone
        );
      case 2:
        return (
          paymentInfo.cardNumber &&
          paymentInfo.expiryDate &&
          paymentInfo.cvv &&
          paymentInfo.cardholderName &&
          agreedToTerms
        );
      default:
        return true;
    }
  };

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Container maxWidth="lg" className="py-8 text-center">
          <Typography variant="h4" className="text-gray-600 dark:text-gray-400">
            Hotel not found
          </Typography>
        </Container>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Container maxWidth="md" className="py-12">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
              <Typography
                variant="h4"
                className="font-bold text-gray-900 dark:text-gray-100 mb-2"
              >
                Booking Confirmed!
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-600 dark:text-gray-400 mb-6"
              >
                Your reservation at {hotel.name} has been successfully
                confirmed.
              </Typography>

              <Box className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
                <Typography variant="h6" className="font-semibold mb-3">
                  Booking Details
                </Typography>
                <Box className="space-y-2">
                  <Box className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">
                      #SNB
                      {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </span>
                  </Box>
                  <Box className="flex justify-between">
                    <span>Hotel:</span>
                    <span>{hotel.name}</span>
                  </Box>
                  <Box className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{checkIn.toLocaleDateString()}</span>
                  </Box>
                  <Box className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{checkOut.toLocaleDateString()}</span>
                  </Box>
                  <Box className="flex justify-between">
                    <span>Guests:</span>
                    <span>{guests}</span>
                  </Box>
                  <Divider />
                  <Box className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </Box>
                </Box>
              </Box>

              <Alert severity="info" className="mb-6 text-left">
                A confirmation email has been sent to {guestInfo.email}. You can
                manage your booking through your account.
              </Alert>

              <Box className="flex gap-3 justify-center">
                <Button
                  variant="contained"
                  onClick={() => router.push("/")}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  Back to Home
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/search")}
                >
                  Search More Hotels
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <Container maxWidth="lg" className="py-8">
          <Typography
            variant="h4"
            className="font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            Complete Your Booking
          </Typography>

          {/* Stepper */}
          <Card className="mb-6">
            <CardContent>
              <Stepper activeStep={activeStep} className="mb-4">
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid xs={12} md={8}>
              <Card>
                <CardContent>
                  {/* Step 0: Dates & Guests */}
                  {activeStep === 0 && (
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-4">
                        Select Your Dates and Guests
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <DatePicker
                            label="Check-in Date"
                            value={checkIn}
                            onChange={setCheckIn}
                            slotProps={{
                              textField: { fullWidth: true },
                            }}
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <DatePicker
                            label="Check-out Date"
                            value={checkOut}
                            onChange={setCheckOut}
                            minDate={checkIn}
                            slotProps={{
                              textField: { fullWidth: true },
                            }}
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Number of Guests"
                            value={guests}
                            onChange={(e) =>
                              setGuests(parseInt(e.target.value) || 1)
                            }
                            inputProps={{ min: 1, max: 10 }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Step 1: Guest Information */}
                  {activeStep === 1 && (
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-4">
                        Guest Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={guestInfo.firstName}
                            onChange={(e) =>
                              setGuestInfo((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            required
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={guestInfo.lastName}
                            onChange={(e) =>
                              setGuestInfo((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            required
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            type="email"
                            label="Email Address"
                            value={guestInfo.email}
                            onChange={(e) =>
                              setGuestInfo((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            required
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            value={guestInfo.phone}
                            onChange={(e) =>
                              setGuestInfo((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            required
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            label="Special Requests (Optional)"
                            value={guestInfo.specialRequests}
                            onChange={(e) =>
                              setGuestInfo((prev) => ({
                                ...prev,
                                specialRequests: e.target.value,
                              }))
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Step 2: Payment */}
                  {activeStep === 2 && (
                    <Box>
                      <Typography variant="h6" className="font-semibold mb-4">
                        Payment Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            label="Cardholder Name"
                            value={paymentInfo.cardholderName}
                            onChange={(e) =>
                              setPaymentInfo((prev) => ({
                                ...prev,
                                cardholderName: e.target.value,
                              }))
                            }
                            required
                          />
                        </Grid>
                        <Grid xs={12}>
                          <TextField
                            fullWidth
                            label="Card Number"
                            value={paymentInfo.cardNumber}
                            onChange={(e) =>
                              setPaymentInfo((prev) => ({
                                ...prev,
                                cardNumber: e.target.value,
                              }))
                            }
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Expiry Date"
                            value={paymentInfo.expiryDate}
                            onChange={(e) =>
                              setPaymentInfo((prev) => ({
                                ...prev,
                                expiryDate: e.target.value,
                              }))
                            }
                            placeholder="MM/YY"
                            required
                          />
                        </Grid>
                        <Grid xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="CVV"
                            value={paymentInfo.cvv}
                            onChange={(e) =>
                              setPaymentInfo((prev) => ({
                                ...prev,
                                cvv: e.target.value,
                              }))
                            }
                            placeholder="123"
                            required
                          />
                        </Grid>
                        <Grid xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={agreedToTerms}
                                onChange={(e) =>
                                  setAgreedToTerms(e.target.checked)
                                }
                              />
                            }
                            label="I agree to the Terms and Conditions and Privacy Policy"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Navigation Buttons */}
                  <Box className="flex justify-between mt-6">
                    <Button
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      variant="contained"
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      {activeStep === steps.length - 1
                        ? "Complete Booking"
                        : "Next"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Booking Summary */}
            <Grid xs={12} md={4}>
              <Card className="sticky top-6">
                <CardContent>
                  <Typography variant="h6" className="font-semibold mb-4">
                    Booking Summary
                  </Typography>

                  <Box className="flex gap-3 mb-4">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Box>
                      <Typography variant="subtitle1" className="font-medium">
                        {hotel.name}
                      </Typography>
                      <Box className="flex items-center text-gray-600 dark:text-gray-400">
                        <LocationOn className="w-4 h-4 mr-1" />
                        <Typography variant="body2">
                          {hotel.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Divider className="mb-4" />

                  <Box className="space-y-3 mb-4">
                    <Box className="flex items-center gap-2">
                      <CalendarToday className="w-4 h-4 text-gray-600" />
                      <Typography variant="body2">
                        {checkIn.toLocaleDateString()} -{" "}
                        {checkOut.toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-2">
                      <Person className="w-4 h-4 text-gray-600" />
                      <Typography variant="body2">
                        {guests} {guests === 1 ? "Guest" : "Guests"}
                      </Typography>
                    </Box>
                    <Typography variant="body2" className="text-gray-600">
                      {calculateNights()}{" "}
                      {calculateNights() === 1 ? "night" : "nights"}
                    </Typography>
                  </Box>

                  <Divider className="mb-4" />

                  <Box className="space-y-2 mb-4">
                    <Box className="flex justify-between">
                      <span>
                        ${hotel.price} × {calculateNights()} nights
                      </span>
                      <span>
                        ${(hotel.price * calculateNights()).toFixed(2)}
                      </span>
                    </Box>
                    <Box className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>
                        ${(hotel.price * calculateNights() * 0.15).toFixed(2)}
                      </span>
                    </Box>
                  </Box>

                  <Divider className="mb-4" />

                  <Box className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </Box>

                  <Box className="mt-4">
                    <Chip
                      label="Free cancellation"
                      color="success"
                      size="small"
                      className="mb-2"
                    />
                    <Typography
                      variant="caption"
                      className="text-gray-600 dark:text-gray-400 block"
                    >
                      You can cancel this booking for free until 24 hours before
                      check-in
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </LocalizationProvider>
  );
}
