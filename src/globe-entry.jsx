import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobeWidget from './components/GlobeWidget';

const rootElement = document.getElementById('globe-root');

if (rootElement) {
    try {
        const root = ReactDOM.createRoot(rootElement);
        root.render(
            <GlobeWidget />
        );
    } catch (err) {
        console.error('Error creating/rendering React root:', err);
    }
}
