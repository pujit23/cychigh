import React from 'react';
import { ArrowBigUp, MessageSquare, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostDetail = ({ post, onUpvote }) => {
    if (!post) return null;

    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl mb-8">
            <Link to="/forum" className="flex items-center gap-2 text-brand-muted hover:text-white mb-6 font-dmono text-sm transition-colors w-max">
                <ArrowLeft size={16} /> Back to Forum
            </Link>

            <div className="flex gap-4 md:gap-6 border-b border-white/10 pb-8">
                <div className="flex flex-col items-center gap-1 min-w-[50px]">
                    <button onClick={onUpvote} className="text-white/40 hover:text-brand-gold transition-colors">
                        <ArrowBigUp size={36} />
                    </button>
                    <span className="font-bebas text-2xl text-brand-gold">{post.upvotes?.length || 0}</span>
                </div>
                
                <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-brand-red/20 border border-brand-red/30 text-brand-red text-xs font-dmono px-3 py-1 rounded uppercase tracking-wider">{post.category}</span>
                        <span className="text-brand-muted text-sm font-dsans border-l border-white/10 pl-3">Posted by <span className="text-white">{post.author?.username}</span></span>
                        <span className="text-white/30 text-sm font-dsans">on {new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
                    
                    <div className="prose prose-invert max-w-none font-dsans text-white/90 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
