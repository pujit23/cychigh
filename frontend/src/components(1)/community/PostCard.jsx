import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowBigUp, User } from 'lucide-react';

const PostCard = ({ post }) => {
    return (
        <Link to={`/forum/${post._id}`} className="block glass-panel p-6 rounded-xl hover:border-brand-gold/30 transition-colors group">
            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-1 min-w-[40px]">
                    <button className="text-white/40 hover:text-brand-gold transition-colors" onClick={(e) => e.preventDefault()}>
                        <ArrowBigUp size={28} />
                    </button>
                    <span className="font-bebas text-xl text-brand-gold">{post.upvotes?.length || 0}</span>
                </div>
                
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand-red/20 text-brand-red text-[10px] font-dmono px-2 py-0.5 rounded uppercase tracking-wider">{post.category}</span>
                        <span className="text-brand-muted text-xs font-dsans">• Posted by {post.author?.username}</span>
                        <span className="text-white/20 text-xs font-dsans">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-gold transition-colors">{post.title}</h3>
                    <p className="text-brand-muted text-sm line-clamp-2 mb-4 font-dsans leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center gap-4 text-brand-muted text-sm font-dsans">
                        <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <MessageSquare size={16} />
                            <span>{post.comments?.length || 0} Comments</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
