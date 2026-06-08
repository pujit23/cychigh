import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreatePost = ({ onPostCreated }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) {
        return (
            <div className="glass-panel p-6 rounded-xl text-center border border-brand-gold/20">
                <p className="text-brand-muted mb-4 font-dsans">You must be logged in to join the discussion.</p>
                <a href="/login" className="btn-gold inline-block">Login to Post</a>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title || !content) return toast.error("Title and content are required.");
        
        setIsSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('/api/posts', { title, content, category }, config);
            toast.success("Post created!");
            setTitle(''); setContent(''); setCategory('General');
            if (onPostCreated) onPostCreated(data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-xl mb-8 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="heading-md mb-6 ml-2">Start a Discussion</h3>
            
            <div className="space-y-4 ml-2">
                <div className="flex gap-4 flex-col md:flex-row">
                    <div className="flex-1">
                        <input 
                            type="text" 
                            placeholder="Post Title..." 
                            value={title} onChange={(e) => setTitle(e.target.value)}
                            className="input-field py-3 font-bold"
                            maxLength={100}
                        />
                    </div>
                    <div className="md:w-1/3">
                        <select 
                            value={category} onChange={(e) => setCategory(e.target.value)}
                            className="input-field py-3 appearance-none hover:border-brand-gold/50 cursor-pointer text-white"
                        >
                            <option value="General" className="bg-brand-panel">General</option>
                            <option value="Showcase" className="bg-brand-panel">Bike Showcase</option>
                            <option value="Help" className="bg-brand-panel">Maintenance Help</option>
                            <option value="Routes" className="bg-brand-panel">Routes & Riding</option>
                            <option value="Marketplace" className="bg-brand-panel">Marketplace</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <textarea 
                        rows="4" 
                        placeholder="What's on your mind?" 
                        value={content} onChange={(e) => setContent(e.target.value)}
                        className="input-field resize-y min-h-[100px]"
                    ></textarea>
                </div>
                
                <div className="flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="btn-gold px-8 py-3">
                        {isSubmitting ? 'Posting...' : 'Publish Post'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CreatePost;
