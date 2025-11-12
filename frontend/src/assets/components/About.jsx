import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Button,
  Chip,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  Flight as FlightIcon,
  Hotel as HotelIcon,
  LocationOn as LocationIcon,
  Explore as ExploreIcon,
  People as PeopleIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingIcon,
  EmojiEvents as AwardIcon,
  ExpandMore as ExpandMoreIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  School as EducationIcon,
  Work as WorkIcon,
  Psychology as PsychologyIcon,
  Computer as TechIcon,
  Palette as DesignIcon,
  Analytics as AnalyticsIcon
} from '@mui/icons-material';
import './About.css'; 

const About = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [teamDialog, setTeamDialog] = useState(false);
  const [stats, setStats] = useState({
    users: 0,
    destinations: 0,
    bookings: 0,
    satisfaction: 0
  });

  // Animate stats on component mount
  useEffect(() => {
    const targetStats = {
      users: 50000,
      destinations: 150,
      bookings: 25000,
      satisfaction: 98
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setStats({
        users: Math.floor(targetStats.users * progress),
        destinations: Math.floor(targetStats.destinations * progress),
        bookings: Math.floor(targetStats.bookings * progress),
        satisfaction: Math.floor(targetStats.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      bio: "Passionate travel enthusiast with 15+ years in the tourism industry. Founded TripPlanner to make travel planning accessible to everyone.",
      experience: "15+ years",
      education: "MBA, Tourism Management",
      skills: ["Strategic Planning", "Business Development", "Customer Experience"],
      email: "sarah@tripplanner.com",
      linkedin: "linkedin.com/in/sarahjohnson",
      achievements: ["Forbes 30 Under 30", "Travel Industry Leader Award 2023"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO & Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Tech innovator with expertise in AI and machine learning. Leads our technical team to create cutting-edge travel solutions.",
      experience: "12+ years",
      education: "MS Computer Science, Stanford",
      skills: ["AI/ML", "Full-Stack Development", "System Architecture"],
      email: "michael@tripplanner.com",
      linkedin: "linkedin.com/in/michaelchen",
      achievements: ["Google Developer Expert", "Open Source Contributor"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Creative designer focused on user experience and beautiful interfaces. Ensures every interaction with TripPlanner is delightful.",
      experience: "8+ years",
      education: "BFA Design, Parsons",
      skills: ["UI/UX Design", "Brand Identity", "User Research"],
      email: "emily@tripplanner.com",
      linkedin: "linkedin.com/in/emilyrodriguez",
      achievements: ["Design Excellence Award", "Featured in Design Week"]
    },
    {
      id: 4,
      name: "David Kim",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Operations expert with deep knowledge of the travel industry. Ensures smooth operations and exceptional customer service.",
      experience: "10+ years",
      education: "MBA, Operations Management",
      skills: ["Operations Management", "Customer Service", "Process Optimization"],
      email: "david@tripplanner.com",
      linkedin: "linkedin.com/in/davidkim",
      achievements: ["Customer Service Excellence", "Operational Efficiency Award"]
    }
  ];

  const features = [
    {
      icon: <FlightIcon />,
      title: "Smart Flight Search",
      description: "Find the best flights with our AI-powered search engine that considers price, time, and convenience."
    },
    {
      icon: <HotelIcon />,
      title: "Hotel Recommendations",
      description: "Get personalized hotel suggestions based on your preferences, budget, and travel style."
    },
    {
      icon: <LocationIcon />,
      title: "Destination Guides",
      description: "Comprehensive guides with local insights, attractions, and hidden gems for every destination."
    },
    {
      icon: <ExploreIcon />,
      title: "Itinerary Planning",
      description: "Create detailed day-by-day itineraries with our intuitive planning tools and local recommendations."
    },
    {
      icon: <SecurityIcon />,
      title: "Secure Bookings",
      description: "Book with confidence using our secure payment system and comprehensive travel insurance options."
    },
    {
      icon: <SupportIcon />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with any questions or issues during your travels."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "TripPlanner Founded",
      description: "Started with a vision to revolutionize travel planning"
    },
    {
      year: "2021",
      title: "First 10,000 Users",
      description: "Reached our first major milestone with growing community"
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched AI-powered recommendations and smart search"
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 50+ countries with local partnerships"
    },
    {
      year: "2024",
      title: "Industry Recognition",
      description: "Awarded 'Best Travel Platform' by Travel Weekly"
    }
  ];

  const faqs = [
    {
      question: "How does TripPlanner help me find the best deals?",
      answer: "Our AI-powered search engine analyzes millions of options across flights, hotels, and activities to find the best prices and deals for your specific travel dates and preferences."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! We use industry-standard SSL encryption and never store your payment information. All transactions are processed through secure, trusted payment gateways."
    },
    {
      question: "Can I modify my booking after confirmation?",
      answer: "Yes, most bookings can be modified through our platform. The flexibility depends on the specific airline, hotel, or activity provider's policies."
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, we offer comprehensive travel insurance options to protect your trip investment. You can add insurance during the booking process."
    },
    {
      question: "How do I contact customer support?",
      answer: "Our 24/7 customer support team is available via live chat, email, or phone. We're here to help with any questions or issues you may have."
    }
  ];

  const handleTeamMemberClick = (member) => {
    setSelectedTeamMember(member);
    setTeamDialog(true);
  };

  return (
    <Box className="about-page" sx={{ background: '#ffecd2', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Box className="hero-content">
            <Typography variant="h2" className="hero-title">
              About TripPlanner
            </Typography>
            <Typography variant="h5" className="hero-subtitle">
              Revolutionizing travel planning with AI-powered recommendations and seamless booking experiences
            </Typography>
            <Typography variant="body1" className="hero-description">
              Founded in 2020, TripPlanner has grown from a simple travel planning tool to a comprehensive platform 
              that helps millions of travelers discover, plan, and book their perfect trips. Our mission is to make 
              travel planning effortless, enjoyable, and accessible to everyone.
            </Typography>
            <Box className="hero-stats">
              <Grid container spacing={4}>
                <Grid item xs={6} md={3}>
                  <Box className="stat-item">
                    <Typography variant="h3" className="stat-number">
                      {stats.users.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      Happy Travelers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="stat-item">
                    <Typography variant="h3" className="stat-number">
                      {stats.destinations}+
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      Destinations
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="stat-item">
                    <Typography variant="h3" className="stat-number">
                      {stats.bookings.toLocaleString()}+
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      Successful Bookings
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box className="stat-item">
                    <Typography variant="h3" className="stat-number">
                      {stats.satisfaction}%
                    </Typography>
                    <Typography variant="body2" className="stat-label">
                      Customer Satisfaction
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Paper className="mission-card">
              <Box className="mission-icon">
                <ExploreIcon />
              </Box>
              <Typography variant="h4" className="mission-title">
                Our Mission
              </Typography>
              <Typography variant="body1" className="mission-text">
                To democratize travel by providing intelligent, personalized travel planning tools that make 
                every journey memorable and stress-free. We believe everyone deserves to experience the world 
                without the hassle of complex planning.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="vision-card">
              <Box className="vision-icon">
                <TrendingIcon />
              </Box>
              <Typography variant="h4" className="vision-title">
                Our Vision
              </Typography>
              <Typography variant="body1" className="vision-text">
                To become the world's most trusted travel companion, leveraging cutting-edge technology to 
                create seamless, personalized travel experiences that inspire and connect people across cultures.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box className="features-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" align="center">
            Why Choose TripPlanner?
          </Typography>
          <Typography variant="h6" className="section-subtitle" align="center">
            Discover the features that make us the preferred choice for travelers worldwide
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="feature-card">
                  <CardContent className="feature-content">
                    <Box className="feature-icon">
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box className="team-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" align="center">
            Meet Our Team
          </Typography>
          <Typography variant="h6" className="section-subtitle" align="center">
            The passionate individuals behind TripPlanner's success
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card className="team-card" onClick={() => handleTeamMemberClick(member)}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={member.image}
                    alt={member.name}
                    className="team-image"
                  />
                  <CardContent className="team-content">
                    <Typography variant="h6" className="team-name">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" className="team-role">
                      {member.role}
                    </Typography>
                    <Typography variant="body2" className="team-bio">
                      {member.bio.substring(0, 100)}...
                    </Typography>
                    <Box className="team-skills">
                      {member.skills.slice(0, 2).map((skill, index) => (
                        <Chip key={index} label={skill} size="small" className="skill-chip" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box className="timeline-section">
        <Container maxWidth="lg">
          <Typography variant="h3" className="section-title" align="center">
            Our Journey
          </Typography>
          <Typography variant="h6" className="section-subtitle" align="center">
            Key milestones in TripPlanner's growth story
          </Typography>
          
          <Timeline position="alternate" className="timeline">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent className="timeline-year">
                  <Typography variant="h6" component="span">
                    {milestone.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className="timeline-dot" />
                  {index < milestones.length - 1 && <TimelineConnector className="timeline-connector" />}
                </TimelineSeparator>
                <TimelineContent className="timeline-content">
                  <Paper className="timeline-paper">
                    <Typography variant="h6" component="span">
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2">
                      {milestone.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box className="faq-section">
        <Container maxWidth="md">
          <Typography variant="h3" className="section-title" align="center">
            Frequently Asked Questions
          </Typography>
          <Typography variant="h6" className="section-subtitle" align="center">
            Everything you need to know about TripPlanner
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            {faqs.map((faq, index) => (
              <Accordion key={index} className="faq-accordion">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" className="faq-question">
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" className="faq-answer">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Team Member Dialog */}
      <Dialog 
        open={teamDialog} 
        onClose={() => setTeamDialog(false)}
        maxWidth="md"
        fullWidth
        className="team-dialog"
      >
        {selectedTeamMember && (
          <>
            <DialogTitle className="dialog-title">
              <Box className="dialog-header">
                <Avatar 
                  src={selectedTeamMember.image} 
                  className="dialog-avatar"
                />
                <Box>
                  <Typography variant="h5">{selectedTeamMember.name}</Typography>
                  <Typography variant="body1" color="text.secondary">
                    {selectedTeamMember.role}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent className="dialog-content">
              <Typography variant="body1" paragraph>
                {selectedTeamMember.bio}
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Experience</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTeamMember.experience}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Education</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTeamMember.education}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Skills</Typography>
                  <Box className="skills-container">
                    {selectedTeamMember.skills.map((skill, index) => (
                      <Chip key={index} label={skill} className="skill-chip" />
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Achievements</Typography>
                  <List dense>
                    {selectedTeamMember.achievements.map((achievement, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <AwardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={achievement} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setTeamDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default About; 