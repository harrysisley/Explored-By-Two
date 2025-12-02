import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

const destinations = [
    { city: "Kyoto, Japan", tip: "Visit Fushimi Inari at dawn to avoid crowds." },
    { city: "Reykjavik, Iceland", tip: "Don't buy bottled water; tap water is pristine." },
    { city: "Cape Town, South Africa", tip: "Take the cable car up Table Mountain for sunset." },
    { city: "Santorini, Greece", tip: "Explore Oia early in the morning for the best photos." },
    { city: "Banff, Canada", tip: "Rent a canoe at Lake Louise for a magical experience." },
    { city: "Queenstown, New Zealand", tip: "Try the Fergburger, but order online to skip the queue." },
];

const TravelInspirationGenerator = () => {
    const [inspiration, setInspiration] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const generateInspiration = () => {
        const random = destinations[Math.floor(Math.random() * destinations.length)];
        setInspiration(random);
        setIsOpen(true);
    };

    return (
        <section className="py-16 bg-gray-50 text-center">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-3xl shadow-lg max-w-2xl mx-auto relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>

                    <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-bold mb-4">Not sure where to go next?</h3>
                    <p className="text-text-muted mb-8">Let the universe decide your next adventure.</p>

                    <button
                        onClick={generateInspiration}
                        className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-black transition-colors shadow-md hover:shadow-lg"
                    >
                        Inspire Me
                    </button>

                    <AnimatePresence>
                        {isOpen && inspiration && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 relative"
                            >
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </button>
                                <h4 className="text-xl font-bold text-accent mb-2">{inspiration.city}</h4>
                                <p className="text-text-muted italic">"{inspiration.tip}"</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default TravelInspirationGenerator;
