import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-serif font-bold text-primary mb-4 block">
                            Explored By Two
                        </Link>
                        <p className="text-text-muted max-w-md">
                            Join Harry & Hannah on their journey around the world.
                            Discovering wildlife, adventure, and meaningful travel stories.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li><Link to="/destinations" className="text-text-muted hover:text-accent transition-colors">Destinations</Link></li>
                            <li><Link to="/photography" className="text-text-muted hover:text-accent transition-colors">Photography</Link></li>
                            <li><Link to="/blog" className="text-text-muted hover:text-accent transition-colors">Travel Tips</Link></li>
                            <li><Link to="/gear" className="text-text-muted hover:text-accent transition-colors">Our Gear</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold text-lg mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Youtube size={20} /></a>
                            <a href="#" className="text-text-muted hover:text-accent transition-colors"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 text-center text-sm text-text-muted">
                    <p>&copy; {new Date().getFullYear()} Explored By Two. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
