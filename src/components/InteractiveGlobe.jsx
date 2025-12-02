import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { motion } from 'framer-motion';

const InteractiveGlobe = () => {
    const globeEl = useRef();
    const [places, setPlaces] = useState([]);
    const [hoverD, setHoverD] = useState(null);

    useEffect(() => {
        // Simulating some visited places
        const visitedPlaces = [
            { name: "London, UK", lat: 51.5074, lng: -0.1278, color: "#0984e3" },
            { name: "New York, USA", lat: 40.7128, lng: -74.0060, color: "#e84393" },
            { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, color: "#00cec9" },
            { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, color: "#fdcb6e" },
            { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241, color: "#6c5ce7" },
            { name: "Reykjavik, Iceland", lat: 64.1466, lng: -21.9426, color: "#0984e3" },
        ];
        setPlaces(visitedPlaces);

        // Auto-rotate
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.5;
        }
    }, []);

    return (
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
            <div className="container relative z-10 pointer-events-none">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-4"
                    >
                        Where We've Been
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our journey across the globe. Click on a marker to see the stories from that location.
                    </p>
                </div>
            </div>

            <div className="h-[600px] w-full flex items-center justify-center cursor-move">
                <Globe
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                    pointsData={places}
                    pointColor="color"
                    pointAltitude={0.1}
                    pointRadius={0.5}
                    pointsMerge={true} // Performance optimization
                    pointLabel="name"
                    onPointHover={setHoverD}
                    atmosphereColor="#3a228a"
                    atmosphereAltitude={0.25}
                />
            </div>

            {hoverD && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                    <p className="font-bold text-lg">{hoverD.name}</p>
                </div>
            )}
        </section>
    );
};

export default InteractiveGlobe;
