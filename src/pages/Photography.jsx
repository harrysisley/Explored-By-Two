import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const photos = [
    { id: 1, src: "from-blue-400 to-purple-500", caption: "Northern Lights, Iceland", size: "h-96" },
    { id: 2, src: "from-green-400 to-teal-500", caption: "Amazon Rainforest, Brazil", size: "h-64" },
    { id: 3, src: "from-orange-400 to-red-500", caption: "Safari Sunset, Kenya", size: "h-80" },
    { id: 4, src: "from-blue-600 to-indigo-600", caption: "Glacier, Patagonia", size: "h-72" },
    { id: 5, src: "from-yellow-400 to-orange-300", caption: "Street Food, Vietnam", size: "h-64" },
    { id: 6, src: "from-pink-400 to-rose-500", caption: "Cherry Blossoms, Japan", size: "h-96" },
    { id: 7, src: "from-cyan-400 to-blue-500", caption: "Underwater, Maldives", size: "h-80" },
    { id: 8, src: "from-gray-200 to-gray-400", caption: "Architecture, Rome", size: "h-72" },
    { id: 9, src: "from-emerald-500 to-green-700", caption: "Rice Terraces, Bali", size: "h-64" },
];

const Photography = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    return (
        <div className="pt-24 pb-24 container">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif font-bold mb-6">Through Our Lens</h1>
                <p className="text-text-muted max-w-2xl mx-auto">
                    Capturing the fleeting moments that make travel so special.
                </p>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {photos.map((photo) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`relative rounded-xl overflow-hidden break-inside-avoid cursor-zoom-in group ${photo.size}`}
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${photo.src} transition-transform duration-500 group-hover:scale-110`}></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <ZoomIn className="text-white" size={32} />
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white font-medium">{photo.caption}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button className="absolute top-4 right-4 text-white hover:text-gray-300">
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className={`w-full max-w-4xl aspect-video bg-gradient-to-br ${selectedPhoto.src} rounded-lg shadow-2xl relative`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                                <h3 className="text-2xl text-white font-serif font-bold">{selectedPhoto.caption}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Photography;
