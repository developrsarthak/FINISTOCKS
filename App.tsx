import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from './services/firebase';
import { User } from './types';

import Login from './components/views/Login';
import Header from './components/Header';
import Dashboard from './components/views/Dashboard';
import Portfolio from './components/views/Portfolio';
import Discover from './components/views/Discover';
import Community from './components/views/Community';
import BottomNav from './components/BottomNav';

type View = 'dashboard' | 'portfolio' | 'discover' | 'community';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      case 'discover':
        return <Discover />;
      case 'community':
        return <Community />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="bg-primary text-text-primary min-h-screen font-sans">
      <Header user={user} />
      <main className="p-4 md:p-8 mb-16 md:mb-0">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
};

export default App;
