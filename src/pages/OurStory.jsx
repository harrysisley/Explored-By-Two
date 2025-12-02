import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ year, title, description, align }) => (
    <motion.div
        initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}
    >
        <div className="w-full md:w-1/2">
            <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-md overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-white/50 font-serif text-2xl">
                    {year}
                </div>
            </div>
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-accent font-bold text-lg block mb-2">{year}</span>
            <h3 className="text-3xl font-serif font-bold mb-4">{title}</h3>
            <p className="text-text-muted leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const OurStory = () => {
    const timeline = [
        { year: "2018", title: "Where it all began", description: "We met in a coffee shop in London. Harry was coding, Hannah was planning a trip to Peru. One conversation led to a lifetime of adventure.", align: "left" },
        { year: "2019", title: "The First Big Trip", description: "We quit our jobs, packed our backpacks, and bought a one-way ticket to Bangkok. 6 months, 12 countries, and countless memories.", align: "right" },
        { year: "2021", title: "Chasing Wildlife", description: "Our passion for wildlife photography grew. We spent weeks in the African bush, learning to capture the raw beauty of nature.", align: "left" },
        { year: "2023", title: "40 Countries & Counting", description: "From the icebergs of Antarctica to the deserts of Namibia. We've learned that the world is big, beautiful, and worth exploring.", align: "right" },
    ];

    return (
        <div className="pt-10">
            {/* Hero */}
            <section className="relative py-24 bg-gray-50 overflow-hidden">
                <div className="container text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-text-muted max-w-2xl mx-auto"
                    >
                        Two travelers, one shared passion for the wild and the wonderful.
                    </motion.p>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 container">
                <div className="max-w-5xl mx-auto">
                    {timeline.map((item, index) => (
                        <TimelineItem key={index} {...item} />
                    ))}
                </div>
            </section>

            {/* Quote */}
            <section className="py-24 bg-primary text-white text-center">
                <div className="container">
                    <motion.blockquote
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-serif italic max-w-4xl mx-auto leading-relaxed"
                    >
                        "Travel isn't just about the places you go, it's about the stories you bring back and the person you become along the way."
                    </motion.blockquote>
                </div>
            </section>
        </div>
    );
};

export default OurStory;
