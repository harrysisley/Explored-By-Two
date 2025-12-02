import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-24 container">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-serif font-bold mb-6">Get in Touch</h1>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        Have a question, partnership proposal, or just want to say hi? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-2xl font-serif font-bold mb-8">Connect with us</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Email</h3>
                                    <p className="text-text-muted">hello@exploredbytwo.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-pink-50 text-pink-600 rounded-full">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Social</h3>
                                    <p className="text-text-muted">@exploredbytwo</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Current Location</h3>
                                    <p className="text-text-muted">Bali, Indonesia</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                            <h3 className="font-bold mb-4">FAQ</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-sm text-primary">Do you accept guest posts?</h4>
                                    <p className="text-sm text-text-muted">Not at the moment, but thanks for asking!</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm text-primary">What camera do you use?</h4>
                                    <p className="text-sm text-text-muted">Check out our Gear page for a full list.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-accent focus:ring-0 transition-colors" placeholder="Harry" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-accent focus:ring-0 transition-colors" placeholder="Potter" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-accent focus:ring-0 transition-colors" placeholder="harry@hogwarts.edu" />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-accent focus:ring-0 transition-colors">
                                <option>General Inquiry</option>
                                <option>Partnership</option>
                                <option>Press</option>
                                <option>Just saying hi</option>
                            </select>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-accent focus:ring-0 transition-colors" placeholder="Tell us something..."></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
