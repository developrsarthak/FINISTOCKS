
import React, { useState } from 'react';
import { CommunityPost, User } from '../../types';
import { mockCommunityPosts, mockStocks } from '../../services/mockData';
import { PaperAirplaneIcon } from '../icons/Icons';

interface PostCardProps {
    post: CommunityPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
        <div className="bg-accent p-4 rounded-lg flex space-x-4">
            <img src={post.author.photoURL} alt={post.author.name} className="w-10 h-10 rounded-full" />
            <div>
                <div className="flex items-baseline space-x-2">
                    <p className="font-bold text-text-primary">{post.author.name}</p>
                    <p className="text-xs text-text-secondary">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
                <p className="mt-1 text-text-primary">{post.content}</p>
            </div>
        </div>
    )
}

const Community: React.FC = () => {
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts[selectedStock] || []);
    const [newPost, setNewPost] = useState('');

    const handleStockChange = (symbol: string) => {
        setSelectedStock(symbol);
        setPosts(mockCommunityPosts[symbol] || []);
    };
    
    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPost.trim()) {
            const newPostData: CommunityPost = {
                id: `post-${Date.now()}`,
                author: { name: 'You', photoURL: `https://i.pravatar.cc/150?u=alexdoe` },
                content: newPost,
                timestamp: Date.now(),
                likes: 0
            };
            setPosts([newPostData, ...posts]);
            setNewPost('');
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <div className="bg-secondary p-4 rounded-lg shadow-lg sticky top-20">
                    <h3 className="font-bold text-lg mb-4 text-text-primary">Discussions</h3>
                    <ul>
                        {mockStocks.map(stock => (
                            <li key={stock.symbol}>
                                <button
                                    onClick={() => handleStockChange(stock.symbol)}
                                    className={`w-full text-left p-2 rounded font-semibold ${selectedStock === stock.symbol ? 'bg-highlight text-white' : 'hover:bg-accent'}`}
                                >
                                    ${stock.symbol}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="md:col-span-3">
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-text-primary">Community Feed for ${selectedStock}</h2>
                    <form onSubmit={handlePostSubmit} className="flex space-x-2 mb-6">
                        <input
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="flex-grow bg-accent p-3 rounded-lg text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-highlight"
                        />
                        <button type="submit" className="bg-highlight p-3 rounded-lg text-white hover:bg-teal-500 transition-colors">
                           <PaperAirplaneIcon />
                        </button>
                    </form>
                    <div className="space-y-4">
                        {posts.length > 0 ? (
                           posts.map(post => <PostCard key={post.id} post={post} />) 
                        ) : (
                            <p className="text-center text-text-secondary">No discussions yet. Start one!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
