import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Map, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, icon: Icon, gradient, link, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <Link to={link} className="block h-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white min-h-[300px]">
                <div>
                    <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-3">{title}</h3>
                    <p className="text-white/80 leading-relaxed">{description}</p>
                </div>
                <div className="flex items-center gap-2 font-medium mt-6 group-hover:translate-x-2 transition-transform">
                    <span>Discover</span>
                    <span>&rarr;</span>
                </div>
            </div>
        </Link>
    </motion.div>
);

const Features = () => {
    const features = [
        {
            title: "Travel Tips",
            description: "Curated guides and expert advice to help you plan your own meaningful adventures.",
            icon: Compass,
            gradient: "from-blue-500 to-teal-400",
            link: "/blog",
            delay: 0.2
        },
        {
            title: "Photography",
            description: "See the world through our lens. Wildlife, landscapes, and street photography galleries.",
            icon: Camera,
            gradient: "from-orange-400 to-pink-500",
            link: "/photography",
            delay: 0.4
        },
        {
            title: "Destinations",
            description: "Explore our detailed guides for over 40 countries. Find your next dream trip.",
            icon: Map,
            gradient: "from-cyan-400 to-purple-500",
            link: "/destinations",
            delay: 0.6
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary"
                    >
                        Curated Experiences
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-muted max-w-2xl mx-auto"
                    >
                        Dive into our world of travel, photography, and storytelling.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
