import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

const destinationsData = [
    { id: 1, name: "Japan", region: "Asia", image: "from-red-500 to-orange-500", tags: ["Culture", "Food"] },
    { id: 2, name: "Iceland", region: "Europe", image: "from-blue-400 to-cyan-300", tags: ["Nature", "Adventure"] },
    { id: 3, name: "South Africa", region: "Africa", image: "from-yellow-500 to-orange-600", tags: ["Wildlife", "Safari"] },
    { id: 4, name: "Peru", region: "South America", image: "from-green-500 to-emerald-700", tags: ["Hiking", "History"] },
    { id: 5, name: "Italy", region: "Europe", image: "from-green-400 to-red-400", tags: ["Food", "History"] },
    { id: 6, name: "New Zealand", region: "Oceania", image: "from-blue-600 to-green-500", tags: ["Adventure", "Nature"] },
    { id: 7, name: "Antarctica", region: "Polar", image: "from-white to-blue-200", tags: ["Expedition", "Wildlife"] },
    { id: 8, name: "Namibia", region: "Africa", image: "from-orange-300 to-red-800", tags: ["Desert", "Safari"] },
];

const FilterButton = ({ active, onClick, children }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-text-muted hover:bg-gray-200'
            }`}
    >
        {children}
    </button>
);

const Destinations = () => {
    const [filter, setFilter] = useState('All');

    const filteredDestinations = filter === 'All'
        ? destinationsData
        : destinationsData.filter(d => d.region === filter);

    const regions = ['All', 'Africa', 'Asia', 'Europe', 'South America', 'Oceania', 'Polar'];

    return (
        <div className="pt-24 pb-24 container">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif font-bold mb-6">Destinations</h1>
                <p className="text-text-muted max-w-2xl mx-auto mb-10">
                    Explore our guides to the most beautiful places on Earth.
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {regions.map(region => (
                        <FilterButton
                            key={region}
                            active={filter === region}
                            onClick={() => setFilter(region)}
                        >
                            {region}
                        </FilterButton>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <AnimatePresence>
                    {filteredDestinations.map((dest) => (
                        <motion.div
                            layout
                            key={dest.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${dest.image} transition-transform duration-500 group-hover:scale-110`}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                <div className="flex gap-2 mb-2">
                                    {dest.tags.map(tag => (
                                        <span key={tag} className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-serif font-bold flex items-center gap-2">
                                    <MapPin size={20} />
                                    {dest.name}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Destinations;
