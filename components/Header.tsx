import React from 'react';
import { auth } from '../services/firebase';
import { User } from '../types';

interface HeaderProps {
    user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <header className="bg-secondary shadow-lg p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-highlight">FrontPage Finance</h1>
            {user && (
                <div className="flex items-center space-x-4">
                    <img src={user.photoURL} alt={user.name} className="w-10 h-10 rounded-full" />
                    <button
                        onClick={handleLogout}
                        className="bg-accent hover:bg-loss text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
