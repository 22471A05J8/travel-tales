import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationsOff as NotificationsOffIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Settings as SettingsIcon,
  Flight as FlightIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Palette as PaletteIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon
} from '@mui/icons-material';
import './Settings.css';

const Settings = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });
  const [myTrips, setMyTrips] = useState([
    {
      id: 1,
      destination: 'Paris, France',
      dates: 'Dec 15-22, 2024',
      status: 'Confirmed',
      bookingId: 'BK001234',
      type: 'Flight + Hotel'
    },
    {
      id: 2,
      destination: 'Mumbai, India',
      dates: 'Jan 10-15, 2025',
      status: 'Pending',
      bookingId: 'BK001235',
      type: 'Flight Only'
    },
    {
      id: 3,
      destination: 'Bangkok, Thailand',
      dates: 'Feb 5-12, 2025',
      status: 'Cancelled',
      bookingId: 'BK001236',
      type: 'Package'
    }
  ]);
  const [editTrip, setEditTrip] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTripEdit = (trip) => {
    setEditTrip({ ...trip });
    setEditDialog(true);
  };

  const handleTripSave = () => {
    setMyTrips(prev => 
      prev.map(trip => 
        trip.id === editTrip.id ? editTrip : trip
      )
    );
    setEditDialog(false);
    setEditTrip(null);
  };

  const handleTripDelete = (trip) => {
    setTripToDelete(trip);
    setDeleteDialog(true);
  };

  const confirmDelete = () => {
    setMyTrips(prev => prev.filter(trip => trip.id !== tripToDelete.id));
    setDeleteDialog(false);
    setTripToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'success';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const settingsTabs = [
    {
      id: 'mytrips',
      label: 'My Trips',
      icon: <FlightIcon />,
      description: 'Manage your travel bookings'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <NotificationsIcon />,
      description: 'Configure notification preferences'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      description: 'Account and app settings'
    }
  ];

  return (
    <Box className="settings-page" sx={{ background: '#ffecd2', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" className="settings-title">
          Settings & Preferences
        </Typography>

        {/* Tab Navigation */}
        <Box className="settings-tabs">
          {settingsTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'contained' : 'outlined'}
              onClick={() => setActiveTab(tab.id)}
              className="tab-button"
              startIcon={tab.icon}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        {/* My Trips Section */}
        {activeTab === 'mytrips' && (
          <Box className="tab-content">
            <Typography variant="h4" className="section-title">
              My Trips
            </Typography>
            <Grid container spacing={3}>
              {myTrips.map((trip) => (
                <Grid item xs={12} md={6} lg={4} key={trip.id}>
                  <Card className="trip-card">
                    <CardContent>
                      <Box className="trip-header">
                        <Typography variant="h6" className="trip-destination">
                          {trip.destination}
                        </Typography>
                        <Chip 
                          label={trip.status} 
                          color={getStatusColor(trip.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {trip.dates}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Booking ID: {trip.bookingId}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Type: {trip.type}
                      </Typography>
                      <Box className="trip-actions">
                        <IconButton 
                          size="small" 
                          onClick={() => handleTripEdit(trip)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => handleTripDelete(trip)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Notifications Section */}
        {activeTab === 'notifications' && (
          <Box className="tab-content">
            <Typography variant="h4" className="section-title">
              Notification Preferences
            </Typography>
            <Card className="settings-card">
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email Notifications"
                      secondary="Receive booking confirmations and updates via email"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Push Notifications"
                      secondary="Get real-time updates on your device"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="SMS Notifications"
                      secondary="Receive important updates via SMS"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <VolumeUpIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Marketing Communications"
                      secondary="Receive offers and promotional content"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notifications.marketing}
                        onChange={() => handleNotificationChange('marketing')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Settings Section */}
        {activeTab === 'settings' && (
          <Box className="tab-content">
            <Typography variant="h4" className="section-title">
              App Settings
            </Typography>
            
            {/* Theme Settings */}
            <Card className="settings-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appearance
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dark Mode"
                      secondary="Switch between light and dark themes"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="settings-card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={currentUser?.name || 'John Doe'}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      defaultValue={currentUser?.email || 'john@example.com'}
                      margin="normal"
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      defaultValue="+1 234 567 8900"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Language</InputLabel>
                      <Select defaultValue="en">
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Box className="settings-actions">
                  <Button variant="contained" color="primary">
                    Save Changes
                  </Button>
                  <Button variant="outlined" onClick={onLogout} color="error">
                    Logout
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>

      {/* Edit Trip Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Trip</DialogTitle>
        <DialogContent>
          {editTrip && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Destination"
                  value={editTrip.destination}
                  onChange={(e) => setEditTrip({...editTrip, destination: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dates"
                  value={editTrip.dates}
                  onChange={(e) => setEditTrip({...editTrip, dates: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editTrip.status}
                    onChange={(e) => setEditTrip({...editTrip, status: e.target.value})}
                  >
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleTripSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Trip</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the trip to {tripToDelete?.destination}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings; 