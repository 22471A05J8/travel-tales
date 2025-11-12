import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Security as SecurityIcon,
  CheckCircle as CheckIcon,
  ExpandMore as ExpandMoreIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  DirectionsCar as CarIcon,
  Restaurant as RestaurantIcon,
  Attractions as AttractionsIcon,
  LocalOffer as OfferIcon,
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Info as InfoIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import './PayPal.css';

// Sample booking data
const sampleBookings = [
  {
    id: 1,
    type: 'hotel',
    title: 'Luxury Hotel Paris',
    description: '5-star hotel in the heart of Paris',
    price: 299.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    location: 'Paris, France',
    dates: 'Apr 15-22, 2024',
    guests: 2,
    rooms: 1,
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
    rating: 4.8,
    reviews: 1247
  },
  {
    id: 2,
    type: 'flight',
    title: 'Round Trip Flight',
    description: 'New York to Paris',
    price: 899.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
    from: 'New York (JFK)',
    to: 'Paris (CDG)',
    dates: 'Apr 15-22, 2024',
    passengers: 2,
    class: 'Economy',
    airline: 'Air France',
    rating: 4.5,
    reviews: 892
  },
  {
    id: 3,
    type: 'car',
    title: 'Car Rental',
    description: 'Compact car for city driving',
    price: 199.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
    location: 'Paris Airport',
    dates: 'Apr 15-22, 2024',
    passengers: 4,
    vehicleType: 'Compact',
    company: 'Hertz',
    features: ['GPS', 'AC', 'Automatic'],
    rating: 4.3,
    reviews: 567
  }
];

const PayPal = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [activeStep, setActiveStep] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Card validation functions
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const steps = [
    'Select Booking',
    'Enter Details',
    'Payment Method',
    'Review & Pay',
    'Confirmation'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleBookingSelect = (booking) => {
    setSelectedBooking(booking);
    setActiveStep(3); // Go directly to Review & Pay step
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Validate payment details
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.cardholderName) {
        setSnackbar({ 
          open: true, 
          message: 'Please fill in all card details', 
          severity: 'error' 
        });
        setLoading(false);
        return;
      }
    }
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setLoading(false);
      setShowPaymentDialog(false);
      setShowReceipt(true);
      setSnackbar({ 
        open: true, 
        message: 'Payment successful! Your booking is confirmed.', 
        severity: 'success' 
      });
    }, 3000);
  };

  const resetForm = () => {
    setSelectedBooking(null);
    setActiveStep(0);
    setPaymentMethod('paypal');
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
    setShowReceipt(false);
    setShowPaymentDialog(false);
  };

  const getBookingIcon = (type) => {
    switch (type) {
      case 'hotel': return <HotelIcon />;
      case 'flight': return <FlightIcon />;
      case 'car': return <CarIcon />;
      case 'restaurant': return <RestaurantIcon />;
      case 'attraction': return <AttractionsIcon />;
      default: return <OfferIcon />;
    }
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <StarIcon key={i} color="primary" fontSize="small" /> : 
        <StarBorderIcon key={i} fontSize="small" />
      );
    }
    return stars;
  };

  const calculateTotal = () => {
    if (!selectedBooking) return 0;
    
    let total = selectedBooking.price;
    
    // Add taxes and fees
    const tax = total * 0.08; // 8% tax
    const serviceFee = total * 0.05; // 5% service fee
    
    return total + tax + serviceFee;
  };

  return (
    <Box className="paypal-container" sx={{ background: '#ffecd2', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h3" className="page-title" gutterBottom>
          Secure Payment
        </Typography>
        <Typography variant="h6" color="text.secondary" className="page-subtitle" gutterBottom>
          Complete your booking with our secure payment system
        </Typography>

        <Grid container spacing={3}>
          {/* Booking Selection */}
          <Grid item xs={12} md={8}>
            <Paper className="booking-section">
              <Box className="section-header">
                <PaymentIcon className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Available Bookings
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {sampleBookings.map((booking) => (
                  <Grid item xs={12} sm={6} lg={4} key={booking.id}>
                    <Card 
                      className={`booking-card ${selectedBooking?.id === booking.id ? 'selected' : ''}`}
                      onClick={() => handleBookingSelect(booking)}
                    >
                      <Box className="booking-image">
                        <img src={booking.image} alt={booking.title} />
                        <Chip 
                          label={booking.type.toUpperCase()} 
                          className="booking-type-chip"
                          icon={getBookingIcon(booking.type)}
                        />
                      </Box>
                      
                      <CardContent className="booking-content">
                        <Typography variant="h6" className="booking-title">
                          {booking.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="booking-description">
                          {booking.description}
                        </Typography>
                        
                        <Box className="booking-details">
                                                  <Typography variant="body2" className="booking-location">
                          {booking.location || `${booking.from} → ${booking.to}`}
                        </Typography>
                          <Typography variant="body2" className="booking-dates">
                            {booking.dates}
                          </Typography>
                        </Box>
                        
                        <Box className="booking-rating">
                          <Box className="stars">
                            {renderStars(booking.rating)}
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {booking.rating} ({booking.reviews} reviews)
                          </Typography>
                        </Box>
                        
                        <Box className="booking-price">
                          <Typography variant="h5" className="price">
                            {formatPrice(booking.price, booking.currency)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            per booking
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Payment Process */}
          <Grid item xs={12} md={4}>
            <Paper className="payment-section">
              <Box className="section-header">
                <SecurityIcon className="section-icon" />
                <Typography variant="h5" className="section-title">
                  Payment Process
                </Typography>
              </Box>

              <Stepper activeStep={activeStep} orientation="vertical" className="payment-stepper">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel className="step-label">
                      <Typography variant="subtitle1" className="step-title">
                        {label}
                      </Typography>
                    </StepLabel>
                    <StepContent className="step-content">
                      {index === 0 && (
                        <Typography variant="body2" color="text.secondary">
                          Select a booking from the available options
                        </Typography>
                      )}
                      {index === 1 && (
                        <Typography variant="body2" color="text.secondary">
                          Enter your personal and travel details
                        </Typography>
                      )}
                      {index === 2 && (
                        <Typography variant="body2" color="text.secondary">
                          Choose your preferred payment method
                        </Typography>
                      )}
                      {index === 3 && (
                        <Typography variant="body2" color="text.secondary">
                          Review your booking and complete payment
                        </Typography>
                      )}
                      {index === 4 && (
                        <Typography variant="body2" color="text.secondary">
                          Receive confirmation and booking details
                        </Typography>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

              {selectedBooking && (
                <Box className="booking-summary">
                  <Typography variant="h6" className="summary-title">
                    Booking Summary
                  </Typography>
                  <Box className="summary-item">
                    <Typography variant="body2">Booking:</Typography>
                    <Typography variant="body2" className="summary-value">
                      {selectedBooking.title}
                    </Typography>
                  </Box>
                  <Box className="summary-item">
                    <Typography variant="body2">Subtotal:</Typography>
                    <Typography variant="body2" className="summary-value">
                      {formatPrice(selectedBooking.price, selectedBooking.currency)}
                    </Typography>
                  </Box>
                  <Box className="summary-item">
                    <Typography variant="body2">Tax (8%):</Typography>
                    <Typography variant="body2" className="summary-value">
                      {formatPrice(selectedBooking.price * 0.08, selectedBooking.currency)}
                    </Typography>
                  </Box>
                  <Box className="summary-item">
                    <Typography variant="body2">Service Fee (5%):</Typography>
                    <Typography variant="body2" className="summary-value">
                      {formatPrice(selectedBooking.price * 0.05, selectedBooking.currency)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box className="summary-item total">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" className="total-price">
                      {formatPrice(calculateTotal(), selectedBooking.currency)}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box className="payment-actions">
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="pay-button"
                  onClick={() => setShowPaymentDialog(true)}
                  disabled={!selectedBooking || activeStep < 3}
                  startIcon={<PaymentIcon />}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} color="inherit" />
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Payment Method Dialog */}
        <Dialog
          open={showPaymentDialog}
          onClose={() => setShowPaymentDialog(false)}
          maxWidth="md"
          fullWidth
          className="payment-dialog"
        >
          <DialogTitle className="dialog-title">
            <PaymentIcon className="dialog-icon" />
            Secure Payment
          </DialogTitle>
          <DialogContent className="dialog-content">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                >
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label={
                      <Box className="payment-option">
                        <img 
                          src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                          alt="PayPal" 
                          className="payment-logo"
                        />
                        <Box>
                          <Typography variant="subtitle1">PayPal</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Pay with your PayPal account
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label={
                      <Box className="payment-option">
                        <CreditCardIcon className="payment-icon" />
                        <Box>
                          <Typography variant="subtitle1">Credit/Debit Card</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Pay with Visa, Mastercard, or American Express
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="bank"
                    control={<Radio />}
                    label={
                      <Box className="payment-option">
                        <BankIcon className="payment-icon" />
                        <Box>
                          <Typography variant="subtitle1">Bank Transfer</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Direct bank transfer (2-3 business days)
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </RadioGroup>

                {paymentMethod === 'card' && (
                  <Box className="card-details" sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))}
                      placeholder="1234 5678 9012 3456"
                      margin="normal"
                      inputProps={{ maxLength: 19 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Expiry Date"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, expiryDate: formatExpiryDate(e.target.value) }))}
                          placeholder="MM/YY"
                          margin="normal"
                          inputProps={{ maxLength: 5 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="CVV"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '') }))}
                          placeholder="123"
                          margin="normal"
                          inputProps={{ maxLength: 4 }}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Cardholder Name"
                      value={paymentDetails.cardholderName}
                      onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                      margin="normal"
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Booking Details
                </Typography>
                
                {selectedBooking && (
                  <Card className="booking-detail-card">
                    <CardContent>
                      <Typography variant="subtitle1" className="booking-title">
                        {selectedBooking.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedBooking.description}
                      </Typography>
                      <Box className="booking-info">
                        <Typography variant="body2">
                          <strong>Dates:</strong> {selectedBooking.dates}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Location:</strong> {selectedBooking.location || `${selectedBooking.from} → ${selectedBooking.to}`}
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box className="price-breakdown">
                        <Box className="price-item">
                          <Typography variant="body2">Subtotal:</Typography>
                          <Typography variant="body2">{formatPrice(selectedBooking.price, selectedBooking.currency)}</Typography>
                        </Box>
                        <Box className="price-item">
                          <Typography variant="body2">Tax (8%):</Typography>
                          <Typography variant="body2">{formatPrice(selectedBooking.price * 0.08, selectedBooking.currency)}</Typography>
                        </Box>
                        <Box className="price-item">
                          <Typography variant="body2">Service Fee (5%):</Typography>
                          <Typography variant="body2">{formatPrice(selectedBooking.price * 0.05, selectedBooking.currency)}</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box className="price-item total">
                          <Typography variant="h6">Total:</Typography>
                          <Typography variant="h6">{formatPrice(calculateTotal(), selectedBooking.currency)}</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button onClick={() => setShowPaymentDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handlePayment}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <PaymentIcon />}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog
          open={showReceipt}
          onClose={() => setShowReceipt(false)}
          maxWidth="md"
          fullWidth
          className="receipt-dialog"
        >
          <DialogTitle className="dialog-title">
            <CheckIcon className="dialog-icon success" />
            Payment Successful!
          </DialogTitle>
          <DialogContent className="dialog-content">
            <Alert severity="success" className="success-alert">
              Your payment has been processed successfully. Your booking is confirmed!
            </Alert>
            
            {selectedBooking && (
              <Card className="receipt-card">
                <CardHeader
                  title="Booking Receipt"
                  subheader={`Transaction ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                  className="receipt-header"
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Booking Details</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Service" 
                            secondary={selectedBooking.title} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Description" 
                            secondary={selectedBooking.description} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Dates" 
                            secondary={selectedBooking.dates} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><InfoIcon /></ListItemIcon>
                          <ListItemText 
                            primary="Location" 
                            secondary={selectedBooking.location || `${selectedBooking.from} → ${selectedBooking.to}`} 
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Payment Summary</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemText 
                            primary="Subtotal" 
                            secondary={formatPrice(selectedBooking.price, selectedBooking.currency)} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Tax (8%)" 
                            secondary={formatPrice(selectedBooking.price * 0.08, selectedBooking.currency)} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Service Fee (5%)" 
                            secondary={formatPrice(selectedBooking.price * 0.05, selectedBooking.currency)} 
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Total" 
                            secondary={formatPrice(calculateTotal(), selectedBooking.currency)} 
                            className="total-item"
                          />
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </DialogContent>
          <DialogActions className="dialog-actions">
            <Button startIcon={<PrintIcon />}>Print Receipt</Button>
            <Button startIcon={<EmailIcon />}>Email Receipt</Button>
            <Button startIcon={<DownloadIcon />}>Download PDF</Button>
            <Button onClick={() => setShowReceipt(false)}>Close</Button>
            <Button variant="contained" onClick={resetForm}>New Booking</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default PayPal;