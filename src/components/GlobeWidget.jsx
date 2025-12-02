import React, { useEffect, useState, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';

const GlobeWidget = () => {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [hoverD, setHoverD] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(600);

    // Load GeoJSON data
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(setCountries);
    }, []);

    // Load visited countries and set up listener
    useEffect(() => {
        const loadVisited = () => {
            try {
                const stored = JSON.parse(localStorage.getItem('visitedCountries') || '[]');
                setVisitedCountries(stored);
            } catch (e) {
                console.error("Error loading visited countries:", e);
            }
        };

        loadVisited();

        const handleUpdate = () => loadVisited();
        window.addEventListener('visitedCountriesUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate); // Also listen for cross-tab updates

        return () => {
            window.removeEventListener('visitedCountriesUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            const container = document.getElementById('globe-root');
            if (container) {
                setWidth(container.clientWidth);
                setHeight(container.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
            globeEl.current.controls().autoRotateSpeed = 0.6;
            globeEl.current.pointOfView({ altitude: 2.5 });
        }
    }, []);

    // Memoize polygon styling to avoid unnecessary re-renders
    const getPolygonLabel = useMemo(() => (d) => `
        <div style="background: rgba(0,0,0,0.8); color: white; padding: 4px 8px; border-radius: 4px; font-family: sans-serif;">
            ${d.properties.NAME} (${visitedCountries.includes(d.properties.NAME) || visitedCountries.includes(d.properties.NAME_LONG) ? 'Visited' : 'Not Visited'})
        </div>
    `, [visitedCountries]);

    return (
        <div style={{ width: '100%', height: '600px' }}>
            <Globe
                ref={globeEl}
                width={width}
                height={height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                atmosphereColor="#3a228a"
                atmosphereAltitude={0.2}
                enablePointerInteraction={true}
            />
        </div>
    );
};

export default GlobeWidget;
