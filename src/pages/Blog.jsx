import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
    {
        id: 1,
        title: "10 Hidden Gems in Kyoto You Can't Miss",
        excerpt: "Beyond the Golden Pavilion and Fushimi Inari lies a side of Kyoto that few tourists see.",
        date: "Oct 12, 2024",
        author: "Hannah",
        category: "Japan",
        gradient: "from-pink-400 to-red-400",
        featured: true
    },
    {
        id: 2,
        title: "Packing Light: Our 7kg Challenge",
        excerpt: "How we traveled for 3 months with just carry-on luggage, and why we'll never go back.",
        date: "Sep 28, 2024",
        author: "Harry",
        category: "Tips",
        gradient: "from-blue-400 to-teal-400",
        featured: false
    },
    {
        id: 3,
        title: "The Ultimate Safari Guide for Beginners",
        excerpt: "Everything you need to know before booking your first African safari adventure.",
        date: "Sep 15, 2024",
        author: "Hannah",
        category: "Africa",
        gradient: "from-yellow-400 to-orange-500",
        featured: false
    },
    {
        id: 4,
        title: "Why We Fell in Love with Patagonia",
        excerpt: "The winds are strong, the mountains are jagged, and the beauty is unmatched.",
        date: "Aug 30, 2024",
        author: "Harry",
        category: "South America",
        gradient: "from-indigo-400 to-purple-500",
        featured: false
    },
    {
        id: 5,
        title: "Street Food Guide: Vietnam",
        excerpt: "From Pho to Banh Mi, here's what you need to eat in Hanoi and Ho Chi Minh City.",
        date: "Aug 12, 2024",
        author: "Hannah",
        category: "Food",
        gradient: "from-green-400 to-emerald-600",
        featured: false
    }
];

const BlogCard = ({ post, featured }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`group cursor-pointer ${featured ? 'md:col-span-2 md:flex gap-8 items-center' : ''}`}
    >
        <div className={`relative overflow-hidden rounded-2xl shadow-md mb-4 ${featured ? 'w-full md:w-1/2 aspect-video' : 'aspect-[4/3]'}`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} transition-transform duration-500 group-hover:scale-105`}></div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-primary">
                {post.category}
            </div>
        </div>
        <div className={featured ? 'w-full md:w-1/2' : ''}>
            <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
            </div>
            <h3 className={`font-serif font-bold mb-3 group-hover:text-accent transition-colors ${featured ? 'text-3xl' : 'text-xl'}`}>
                {post.title}
            </h3>
            <p className="text-text-muted mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                Read Article <ArrowRight size={16} />
            </div>
        </div>
    </motion.div>
);

const Blog = () => {
    return (
        <div className="pt-24 pb-24 container">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif font-bold mb-6">Travel Journal</h1>
                <p className="text-text-muted max-w-2xl mx-auto">
                    Stories, tips, and guides from the road.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} featured={post.featured} />
                ))}
            </div>
        </div>
    );
};

export default Blog;
