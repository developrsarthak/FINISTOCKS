
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { User } from './types';

// Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Login from './components/views/Login';

// Views
import Dashboard from './components/views/Dashboard';
import Portfolio from './components/views/Portfolio';
import Discover from './components/views/Discover';
import Community from './components/views/Community';
import StockDetail from './components/views/StockDetail';

type View = 'dashboard' | 'portfolio' | 'discover' | 'community';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [selectedStock, setSelectedStock] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName || 'No Name',
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

    const handleSelectStock = (symbol: string) => {
        setSelectedStock(symbol);
    };

    const handleBack = () => {
        setSelectedStock(null);
    };

    const renderContent = () => {
        if (selectedStock) {
            return <StockDetail symbol={selectedStock} onBack={handleBack} />;
        }

        switch (currentView) {
            case 'dashboard':
                return <Dashboard onSelectStock={handleSelectStock} />;
            case 'portfolio':
                return <Portfolio />;
            case 'discover':
                return <Discover onSelectStock={handleSelectStock} />;
            case 'community':
                return <Community />;
            default:
                return <Dashboard onSelectStock={handleSelectStock} />;
        }
    };

    if (loading) {
        return <div className="bg-primary min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <div className="bg-primary min-h-screen text-text-primary font-sans">
            <Header user={user} />
            <main className="p-4 md:p-8 mb-16 md:mb-0">
                {renderContent()}
            </main>
            <BottomNav currentView={currentView} setCurrentView={(v) => { setSelectedStock(null); setCurrentView(v); }} />
        </div>
    );
};

export default App;
