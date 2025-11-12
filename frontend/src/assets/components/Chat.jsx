import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  Badge,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachIcon,
  EmojiEmotions as EmojiIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Block as BlockIcon,
  Report as ReportIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Notifications as NotificationsIcon,
  NotificationsOff as NotificationsOffIcon,
  Videocam as VideoIcon,
  Call as CallIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  CheckCircle as OnlineIcon,
  RadioButtonUnchecked as OfflineIcon,
  Schedule as TypingIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import './Chat.css';

// Simple real-time chat using localStorage and setInterval (works immediately!)
const CHAT_CHANNEL = 'tripplanner-chat';
const TYPING_CHANNEL = 'tripplanner-typing';
const USERS_CHANNEL = 'tripplanner-users';

// Default user data
const defaultUser = {
  id: 'user_' + Math.random().toString(36).substr(2, 9),
  username: 'Traveler',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  role: 'Traveler',
  status: 'online',
  lastSeen: new Date()
};

const Chat = () => {
  // User state
  const [currentUser, setCurrentUser] = useState(defaultUser);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [notifications, setNotifications] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [currentRoom, setCurrentRoom] = useState('general');
  const [isConnected, setIsConnected] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // Initialize real-time updates
  useEffect(() => {
    // Load existing messages
    const savedMessages = localStorage.getItem(CHAT_CHANNEL);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // Load existing users
    const savedUsers = localStorage.getItem(USERS_CHANNEL);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    // Set up real-time polling (simulates WebSocket)
    intervalRef.current = setInterval(() => {
      // Check for new messages
      const savedMessages = localStorage.getItem(CHAT_CHANNEL);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      }

      // Check for new users
      const savedUsers = localStorage.getItem(USERS_CHANNEL);
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        setUsers(parsedUsers);
      }

      // Check for typing indicators
      const savedTyping = localStorage.getItem(TYPING_CHANNEL);
      if (savedTyping) {
        const parsedTyping = JSON.parse(savedTyping);
        setTypingUsers(new Set(parsedTyping));
      }
    }, 1000); // Poll every second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle typing timeout
  useEffect(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [typingUsers]);

  // Filter users based on search and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleJoinChat = (userData) => {
    setCurrentUser(userData);
    setShowJoinDialog(false);
    
    // Add user to the chat
    const updatedUsers = [...users, { ...userData, lastSeen: new Date() }];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_CHANNEL, JSON.stringify(updatedUsers));
    
    // Add welcome message
    const welcomeMessage = {
      id: Date.now(),
      senderId: 'system',
      senderName: 'System',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      text: `${userData.username} has joined the chat!`,
      timestamp: new Date(),
      type: 'system'
    };
    
    const updatedMessages = [...messages, welcomeMessage];
    setMessages(updatedMessages);
    localStorage.setItem(CHAT_CHANNEL, JSON.stringify(updatedMessages));
    
    setSnackbar({ open: true, message: 'Welcome to TripPlanner Chat!', severity: 'success' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        senderId: currentUser.id,
        senderName: currentUser.username,
        senderAvatar: currentUser.avatar,
        text: newMessage.trim(),
        timestamp: new Date(),
        type: 'text'
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(CHAT_CHANNEL, JSON.stringify(updatedMessages));
      
      setNewMessage('');
      
      // Stop typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Remove typing indicator
      const currentTyping = Array.from(typingUsers);
      const filteredTyping = currentTyping.filter(id => id !== currentUser.id);
      setTypingUsers(new Set(filteredTyping));
      localStorage.setItem(TYPING_CHANNEL, JSON.stringify(filteredTyping));
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = () => {
    // Add typing indicator
    const currentTyping = Array.from(typingUsers);
    if (!currentTyping.includes(currentUser.id)) {
      currentTyping.push(currentUser.id);
      setTypingUsers(new Set(currentTyping));
      localStorage.setItem(TYPING_CHANNEL, JSON.stringify(currentTyping));
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      const updatedTyping = Array.from(typingUsers).filter(id => id !== currentUser.id);
      setTypingUsers(new Set(updatedTyping));
      localStorage.setItem(TYPING_CHANNEL, JSON.stringify(updatedTyping));
    }, 2000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const message = {
        id: Date.now(),
        senderId: currentUser.id,
        senderName: currentUser.username,
        senderAvatar: currentUser.avatar,
        text: `📎 ${file.name}`,
        timestamp: new Date(),
        type: 'file',
        fileName: file.name,
        fileSize: file.size
      };
      
      const updatedMessages = [...messages, message];
      setMessages(updatedMessages);
      localStorage.setItem(CHAT_CHANNEL, JSON.stringify(updatedMessages));
    }
  };

  const handleStarMessage = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(CHAT_CHANNEL, JSON.stringify(updatedMessages));
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem(CHAT_CHANNEL, JSON.stringify(updatedMessages));
    setSnackbar({ open: true, message: 'Message deleted', severity: 'info' });
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4caf50';
      case 'offline': return '#9e9e9e';
      case 'away': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <OnlineIcon />;
      case 'offline': return <OfflineIcon />;
      case 'away': return <OfflineIcon />;
      default: return <OfflineIcon />;
    }
  };

  const renderMessage = (message) => {
    const isOwnMessage = message.senderId === currentUser.id;
    const isSystemMessage = message.senderId === 'system';
    const user = users.find(u => u.id === message.senderId) || currentUser;

    if (isSystemMessage) {
      return (
        <ListItem key={message.id} className="system-message">
          <Box className="system-bubble">
            <Typography variant="body2" color="text.secondary" align="center">
              {message.text}
            </Typography>
          </Box>
        </ListItem>
      );
    }

    return (
      <ListItem
        key={message.id}
        className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}
        sx={{ flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}
      >
        <Box className="message-bubble">
          {!isOwnMessage && (
            <Box className="message-header">
              <Avatar src={user.avatar} className="message-avatar" />
              <Typography variant="caption" className="message-sender">
                {user.username}
              </Typography>
            </Box>
          )}
          
          <Box className="message-content">
            {message.type === 'file' ? (
              <Box className="file-message">
                <AttachIcon />
                <Typography variant="body2">{message.text}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {Math.round(message.fileSize / 1024)} KB
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1" className="message-text">
                {message.text}
              </Typography>
            )}
          </Box>

          <Box className="message-footer">
            <Typography variant="caption" className="message-time">
              {formatTime(message.timestamp)}
            </Typography>
            
            <Box className="message-actions">
              <Tooltip title={message.isStarred ? 'Unstar' : 'Star'}>
                <IconButton
                  size="small"
                  onClick={() => handleStarMessage(message.id)}
                  className={message.isStarred ? 'starred' : ''}
                >
                  {message.isStarred ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Reply">
                <IconButton size="small">
                  <ReplyIcon />
                </IconButton>
              </Tooltip>
              
              {isOwnMessage && (
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Box>
      </ListItem>
    );
  };

  return (
    <Box className="chat-container" sx={{ background: '#ffecd2', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ height: '100vh', py: 2 }}>
        <Grid container spacing={2} sx={{ height: '100%' }}>
          {/* Sidebar - User List */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className="chat-sidebar">
              <Box className="sidebar-header">
                <Typography variant="h6" className="sidebar-title">
                  Messages
                </Typography>
                <Box className="sidebar-actions">
                  <Tooltip title="Search">
                    <IconButton size="small">
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Filter">
                    <IconButton size="small">
                      <FilterIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Settings">
                    <IconButton size="small" onClick={() => setShowSettings(true)}>
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box className="search-section">
                <TextField
                  fullWidth
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Box>

              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                className="status-tabs"
              >
                <Tab label="All" />
                <Tab label="Online" />
                <Tab label="Unread" />
              </Tabs>

              <List className="user-list">
                {filteredUsers.map((user) => (
                  <ListItem
                    key={user.id}
                    className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                    onClick={() => setSelectedUser(user)}
                    button
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Box
                            className="status-indicator"
                            sx={{ backgroundColor: getStatusColor(user.status) }}
                          />
                        }
                      >
                        <Avatar src={user.avatar} className="user-avatar" />
                      </Badge>
                    </ListItemAvatar>
                    
                    <ListItemText
                      primary={
                        <Box className="user-info">
                          <Typography variant="subtitle2" className="user-name">
                            {user.username}
                          </Typography>
                          {typingUsers.has(user.id) && (
                            <Chip
                              label="typing..."
                              size="small"
                              className="typing-chip"
                              icon={<TypingIcon />}
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box className="user-details">
                          <Typography variant="caption" className="user-role">
                            {user.role}
                          </Typography>
                          <Typography variant="caption" className="user-status">
                            {user.status === 'online' ? 'Online' : formatTime(user.lastSeen)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Main Chat Area */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper className="chat-main">
              {/* Chat Header */}
              <Box className="chat-header">
                <Box className="chat-user-info">
                  <Box className="connection-status">
                    <Tooltip title="Real-time chat active">
                      <IconButton size="small" disabled>
                        <WifiIcon color="success" />
                      </IconButton>
                    </Tooltip>
                    <Typography variant="caption" color="text.secondary">
                      Live
                    </Typography>
                  </Box>
                  
                  <Box className="chat-room-info">
                    <Typography variant="h6" className="chat-room-name">
                      TripPlanner Chat
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {users.length} online
                    </Typography>
                  </Box>
                </Box>

                <Box className="chat-actions">
                  <Tooltip title="Voice Call">
                    <IconButton size="small" disabled={!selectedUser}>
                      <CallIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Video Call">
                    <IconButton size="small" disabled={!selectedUser}>
                      <VideoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="User Info">
                    <IconButton 
                      size="small" 
                      onClick={() => setShowUserInfo(true)}
                      disabled={!selectedUser}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="More Options">
                    <IconButton size="small">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Divider />

              {/* Messages Area */}
              <Box className="messages-container">
                <List className="messages-list">
                  {messages.map(renderMessage)}
                  
                  {Array.from(typingUsers).map(userId => {
                    const typingUser = users.find(u => u.id === userId);
                    if (!typingUser || typingUser.id === currentUser.id) return null;
                    
                    return (
                      <ListItem key={userId} className="typing-indicator">
                        <Box className="typing-bubble">
                          <Typography variant="body2" color="text.secondary">
                            {typingUser.username} is typing...
                          </Typography>
                          <Box className="typing-dots">
                            <Box className="dot" />
                            <Box className="dot" />
                            <Box className="dot" />
                          </Box>
                        </Box>
                      </ListItem>
                    );
                  })}
                  
                  <div ref={messagesEndRef} />
                </List>
              </Box>

              {/* Message Input */}
              <Box className="message-input-container">
                <Box className="message-input-wrapper">
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onInput={handleTyping}
                    className="message-input"
                    InputProps={{
                      endAdornment: (
                        <Box className="input-actions">
                          <Tooltip title="Attach File">
                            <IconButton
                              size="small"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <AttachIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Emoji">
                            <IconButton size="small">
                              <EmojiIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )
                    }}
                  />
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  
                  <Button
                    variant="contained"
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Settings Dialog */}
      <Dialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        maxWidth="sm"
        fullWidth
        className="settings-dialog"
      >
        <DialogTitle className="dialog-title">
          Chat Settings
        </DialogTitle>
        <DialogContent className="dialog-content">
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            }
            label="Enable Notifications"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Configure your chat preferences and notification settings.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* User Info Dialog */}
      <Dialog
        open={showUserInfo && selectedUser}
        onClose={() => setShowUserInfo(false)}
        maxWidth="sm"
        fullWidth
        className="user-info-dialog"
      >
        <DialogTitle className="dialog-title">
          User Information
        </DialogTitle>
        <DialogContent className="dialog-content">
          {selectedUser && (
            <Box className="user-info-content">
              <Avatar src={selectedUser.avatar} className="user-info-avatar" />
              <Typography variant="h6">{selectedUser.username}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedUser.role}
              </Typography>
              <Box className="user-status-info">
                <Box
                  className="status-indicator"
                  sx={{ backgroundColor: getStatusColor(selectedUser.status) }}
                />
                <Typography variant="body2">
                  {selectedUser.status === 'online' ? 'Online' : `Last seen ${formatTime(selectedUser.lastSeen)}`}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUserInfo(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Join Chat Dialog */}
      <Dialog
        open={showJoinDialog}
        onClose={() => {}} // Prevent closing
        maxWidth="sm"
        fullWidth
        className="join-dialog"
      >
        <DialogTitle className="dialog-title">
          Join TripPlanner Chat
        </DialogTitle>
        <DialogContent className="dialog-content">
          <Box className="join-form">
            <TextField
              fullWidth
              label="Your Name"
              value={currentUser.username}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, username: e.target.value }))}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={currentUser.role}
                onChange={(e) => setCurrentUser(prev => ({ ...prev, role: e.target.value }))}
                label="Role"
              >
                <MenuItem value="Traveler">Traveler</MenuItem>
                <MenuItem value="Travel Agent">Travel Agent</MenuItem>
                <MenuItem value="Customer Support">Customer Support</MenuItem>
                <MenuItem value="Booking Specialist">Booking Specialist</MenuItem>
                <MenuItem value="Travel Consultant">Travel Consultant</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Avatar URL (optional)"
              value={currentUser.avatar}
              onChange={(e) => setCurrentUser(prev => ({ ...prev, avatar: e.target.value }))}
              margin="normal"
              placeholder="https://example.com/avatar.jpg"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            onClick={() => handleJoinChat(currentUser)}
            disabled={!currentUser.username.trim()}
          >
            Join Chat
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Chat; 