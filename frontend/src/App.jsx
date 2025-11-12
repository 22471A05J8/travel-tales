import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Flights from './assets/components/Flights'
import Travel from './assets/components/Travel'
import Hotels from './assets/components/Hotels'
import Activities from './assets/components/Activities'
import PayPal from './assets/components/PayPal'
import Login from './assets/components/Login'
import Home from './assets/components/Home'
import InnerHome from './assets/components/InnerHome'
import SideNav from './assets/components/SideNav'
import ProfileMenu from './assets/components/ProfileMenu'
import Chat from './assets/components/Chat'
import Contact from './assets/components/Contact'
import About from './assets/components/About'
import Gallery from './assets/components/Gallery'
import Settings from './assets/components/Settings'
import Guides from './assets/components/Guides'
import Guide from './assets/components/Guide'
import AccessibleTour from './assets/components/AccessableTour'
function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [allBookings, setAllBookings] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showHome, setShowHome] = useState(true)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  // Function to add bookings from different components
  const addBooking = (booking) => {
    setAllBookings(prev => [...prev, booking])
  }

  // Login/Logout functions
  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    setShowHome(false)
    setActiveTab('dashboard')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setAllBookings([])
    setShowHome(true)
  }

  const handleSignIn = () => {
    setShowHome(false)
  }

  const handleSignUp = () => {
    setShowHome(false)
  }

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((open) => !open)
  }

  const handleProfileClick = () => {
    setActiveTab('profile')
    setProfileMenuOpen(false)
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen)
  }

  // Show home page if not logged in and showHome is true
  if (showHome && !isLoggedIn) {
    return (
      <Home 
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    )
  }

  // Show login page if not logged in and showHome is false
  if (!isLoggedIn) {
    return (
      <Login 
        onLogin={handleLogin}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    )
  }

  // Show main application if logged in
  return (
    <div className="app-container">
      {/* Side Navigation */}
      <SideNav 
        isOpen={isSideNavOpen}
        onToggle={toggleSideNav}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onProfileClick={handleProfileClick}
      />

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            {/* Removed TravelEase Pro header as per user request */}
          </div>
          {/* ProfileMenu removed as per user request */}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'dashboard' && (
          <InnerHome 
            currentUser={currentUser}
            onLogout={handleLogout}
            onProfileClick={handleProfileClick}
            onTabChange={handleTabChange}
            activeTab={activeTab}
          />
        )}
        {activeTab === 'profile' && (
          <Login 
            onLogin={handleLogin}
            onLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        )}
        {activeTab === 'travel' && <Travel bookings={allBookings} />}
        {activeTab === 'flights' && <Flights onBooking={addBooking} />}
        {activeTab === 'hotels' && <Hotels onBooking={addBooking} />}
        {activeTab === 'activities' && <Activities onBooking={addBooking} />}
        {activeTab === 'gallery' && <Gallery />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'contact' && <Contact />}
        {activeTab === 'about' && <About />}
        {activeTab === 'settings' && <Settings currentUser={currentUser} onLogout={handleLogout} />}
        {activeTab === 'payment' && <PayPal />}
        {activeTab === 'guides' && <Guides />}
        {activeTab === 'guide' && <Guide />}
        {activeTab === 'AccessibleTour' && <AccessibleTour/>}
      </main>
    </div>
  )
}
export default App
