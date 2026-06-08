import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Send, User } from 'lucide-react';

const CommentSection = ({ postId, comments, onCommentAdded }) => {
    const { user } = useAuth();
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        
        setIsSubmitting(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`/api/posts/${postId}/comments`, { text }, config);
            setText('');
            if (onCommentAdded) onCommentAdded(data);
            toast.success("Comment added");
        } catch (error) {
            toast.error("Failed to add comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-8">
            <h3 className="heading-md mb-6">{comments?.length || 0} Comments</h3>
            
            {user ? (
                <form onSubmit={handleSubmit} className="mb-10 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-panel border border-brand-gold/30 flex items-center justify-center shrink-0">
                        <User size={20} className="text-brand-gold" />
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Add to the discussion..."
                            className="input-field pr-12 resize-none h-[44px] min-h-[44px] pt-[10px]"
                            rows="1"
                        ></textarea>
                        <button 
                            type="submit" 
                            disabled={isSubmitting || !text.trim()}
                            className="absolute right-2 top-2 text-brand-gold hover:text-white disabled:opacity-50 transition-colors p-1"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-4 border border-white/10 rounded-lg text-center bg-black/30">
                    <p className="text-brand-muted text-sm font-dsans">Login to join the conversation.</p>
                </div>
            )}

            <div className="space-y-6">
                {comments?.map((comment) => (
                    <div key={comment._id} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                            <span className="font-bebas text-lg text-white/50">{comment.user?.username?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 glass-panel p-4 rounded-xl rounded-tl-none border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bebas tracking-widest text-brand-gold">{comment.user?.username}</span>
                                <span className="text-white/30 text-xs font-dmono">{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-white/90 text-sm font-dsans leading-relaxed whitespace-pre-wrap">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
