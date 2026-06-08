import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/community/PostCard';
import PostDetail from '../components/community/PostDetail';
import CreatePost from '../components/community/CreatePost';
import CommentSection from '../components/community/CommentSection';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

const CommunityPage = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('/api/posts');
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSinglePost = async (postId) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/posts/${postId}`);
            setSinglePost(data);
        } catch (error) {
            toast.error("Thread not found");
        } finally {
            setLoading(false);
        }
    };

    const handleUpvote = async () => {
        if (!singlePost) return;
        try {
            const { data } = await axios.put(`/api/posts/${singlePost._id}/upvote`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
            setSinglePost(data);
        } catch (error) {
            toast.error("Login to upvote");
        }
    };

    useEffect(() => {
        if (id) {
            fetchSinglePost(id);
        } else {
            fetchPosts();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-12">
                <LoadingSkeleton />
                <LoadingSkeleton />
            </div>
        );
    }

    if (id && singlePost) {
        return (
            <div className="max-w-4xl mx-auto py-12 px-4">
                <PostDetail post={singlePost} onUpvote={handleUpvote} />
                <CommentSection postId={singlePost._id} comments={singlePost.comments} onCommentAdded={(updatedPost) => setSinglePost(updatedPost)} />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="heading-lg mb-4 text-brand-gold">The Peloton Forum</h1>
                <p className="text-xl text-brand-muted font-dsans">Discuss gear, showcase builds, and plan rides with the CycHigh community.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-2/3 space-y-4">
                    {posts.length === 0 ? (
                        <div className="glass-panel p-8 text-center text-brand-muted font-dsans">No discussions found. Start one!</div>
                    ) : (
                        posts.map(post => <PostCard key={post._id} post={post} />)
                    )}
                </div>
                
                <div className="w-full lg:w-1/3">
                    <CreatePost onPostCreated={(newPost) => setPosts([newPost, ...posts])} />
                    
                    <div className="glass-panel p-6 rounded-xl border border-white/10 mt-6">
                        <h4 className="font-bebas text-xl tracking-widest text-brand-muted mb-4">Forum Rules</h4>
                        <ul className="text-sm font-dsans text-white/70 space-y-2 list-disc pl-4">
                            <li>Be respectful to all riders.</li>
                            <li>No spam or self-promotion.</li>
                            <li>Search before posting a question.</li>
                            <li>Use correct flairs for visibility.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityPage;
