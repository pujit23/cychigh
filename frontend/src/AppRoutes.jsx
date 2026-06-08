// ── FILE: src/AppRoutes.jsx ──────────────────────────────────────────
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth guard
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

// Cycle pages
import CyclePage from './pages/CyclePage';
import SearchPage from './pages/SearchPage';

// Tools & features
import ComparePage from './pages/ComparePage';
import QuizPage from './pages/QuizPage';
import BuilderPage from './pages/BuilderPage';
import ToolsPage from './pages/ToolsPage';

// Knowledge
import KnowledgePage from './pages/KnowledgePage';
import DictionaryPage from './pages/DictionaryPage';
import MaintenancePage from './pages/MaintenancePage';
import RoutesPage from './pages/RoutesPage';
import MarketplacePage from './pages/MarketplacePage';

// Protected pages
import Community from './pages/Community';
import CommunityRooms from './pages/CommunityRooms';
import ChatRoom from './pages/ChatRoom';
import LiveRideMap from './pages/LiveRideMap';
import TrackerPage from './pages/TrackerPage';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

// Chat room has its own full-height layout — no footer/navbar wrap
const ChatLayout = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ width: '100%', height: '100vh', overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isChatRoom = location.pathname.startsWith('/community/rooms/');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isChatRoom && <Navbar />}
      <main style={{ flex: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* ── Public Routes ──────────────────────────────── */}
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
            <Route path="/cycle/:id" element={<PageWrapper><CyclePage /></PageWrapper>} />
            <Route path="/cycles" element={<PageWrapper><SearchPage /></PageWrapper>} />
            <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />

            {/* ── Tools (public) ──────────────────────────────── */}
            <Route path="/compare" element={<PageWrapper><ComparePage /></PageWrapper>} />
            <Route path="/quiz" element={<PageWrapper><QuizPage /></PageWrapper>} />
            <Route path="/builder" element={<PageWrapper><BuilderPage /></PageWrapper>} />
            <Route path="/tools" element={<PageWrapper><ToolsPage /></PageWrapper>} />
            <Route path="/knowledge" element={<PageWrapper><KnowledgePage /></PageWrapper>} />
            <Route path="/dictionary" element={<PageWrapper><DictionaryPage /></PageWrapper>} />
            <Route path="/maintenance" element={<PageWrapper><MaintenancePage /></PageWrapper>} />
            <Route path="/routes" element={<PageWrapper><RoutesPage /></PageWrapper>} />
            <Route path="/marketplace" element={<PageWrapper><MarketplacePage /></PageWrapper>} />

            {/* ── Protected: Community ─────────────────────── */}
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <PageWrapper><Community /></PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/rooms"
              element={
                <ProtectedRoute>
                  <PageWrapper><CommunityRooms /></PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/rooms/:roomId"
              element={
                <ProtectedRoute>
                  <ChatLayout><ChatRoom /></ChatLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/community/live-map"
              element={
                <ProtectedRoute>
                  <ChatLayout><LiveRideMap /></ChatLayout>
                </ProtectedRoute>
              }
            />

            {/* ── Protected: Tracker ───────────────────────── */}
            <Route
              path="/tracker"
              element={
                <ProtectedRoute>
                  <PageWrapper><TrackerPage /></PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* ── Protected: Profile ───────────────────────── */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageWrapper><Profile /></PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* ── Protected: Admin ─────────────────────────── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <PageWrapper><AdminPage /></PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* ── 404 ──────────────────────────────────────── */}
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />

          </Routes>
        </AnimatePresence>
      </main>
      {!isChatRoom && <Footer />}
    </div>
  );
};

export default AppRoutes;
