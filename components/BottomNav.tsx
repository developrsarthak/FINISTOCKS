import React from 'react';
import { HomeIcon, BriefcaseIcon, CompassIcon, UserGroupIcon } from './icons/Icons';

type View = 'dashboard' | 'portfolio' | 'discover' | 'community';

interface BottomNavProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors ${isActive ? 'text-highlight' : 'text-text-secondary hover:text-white'}`}
        >
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Home', icon: <HomeIcon /> },
        { id: 'portfolio', label: 'Portfolio', icon: <BriefcaseIcon /> },
        { id: 'discover', label: 'Discover', icon: <CompassIcon /> },
        { id: 'community', label: 'Community', icon: <UserGroupIcon /> },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-secondary border-t border-accent shadow-lg z-10 flex">
            {navItems.map(item => (
                <NavItem
                    key={item.id}
                    label={item.label}
                    icon={item.icon}
                    isActive={currentView === item.id}
                    onClick={() => setCurrentView(item.id as View)}
                />
            ))}
        </nav>
    );
};

export default BottomNav;
