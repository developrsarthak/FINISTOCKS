// FIX: Create content for App.tsx to serve as the main application component.
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { User, View } from './types';

import Login from './components/views/Login';
import Header from './components/Header';
import Dashboard from './components/views/Dashboard';
import Portfolio from './components/views/Portfolio';
import Discover from './components/views/Discover';
import Community from './components/views/Community';
import AiAssistant from './components/AiAssistant';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<View>('dashboard');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName,
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
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
            case 'portfolio':
                return <Portfolio />;
            case 'discover':
                return <Discover />;
            case 'community':
                return <Community />;
            case 'dashboard':
            default:
                return <Dashboard />;
        }
    };

    if (loading) {
        return <div className="bg-primary min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    if (!user) {
        return <Login />;
    }

    return (
        <div className="bg-primary min-h-screen text-text-primary">
            <Header user={user} />
            <main className="p-4 md:p-8 max-w-7xl mx-auto pb-20 md:pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {renderView()}
                    </div>
                    <div className="hidden lg:block">
                        <AiAssistant />
                    </div>
                </div>
            </main>
            <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
        </div>
    );
};

export default App;
