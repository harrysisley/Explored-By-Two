import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Laptop, ShoppingBag } from 'lucide-react';

const gearCategories = [
    {
        title: "Photography",
        icon: Camera,
        items: [
            { name: "Sony A7IV", desc: "Our main workhorse camera for both photo and video.", gradient: "from-gray-700 to-gray-900" },
            { name: "Sony 24-70mm GM II", desc: "The most versatile lens we own. Sharp and fast.", gradient: "from-gray-600 to-gray-800" },
            { name: "DJI Mini 3 Pro", desc: "Compact drone perfect for travel content.", gradient: "from-gray-500 to-gray-700" },
        ]
    },
    {
        title: "Tech Essentials",
        icon: Laptop,
        items: [
            { name: "MacBook Pro 14\"", desc: "Powerful enough to edit 4K video on the go.", gradient: "from-blue-900 to-gray-900" },
            { name: "SanDisk Extreme SSD", desc: "Rugged storage for backing up footage.", gradient: "from-orange-600 to-red-700" },
        ]
    },
    {
        title: "Travel Bags",
        icon: ShoppingBag,
        items: [
            { name: "Peak Design Travel Backpack", desc: "45L of organized space. Fits everything.", gradient: "from-green-800 to-teal-900" },
            { name: "Wandrd Prvke", desc: "Stylish daypack for city exploration.", gradient: "from-blue-800 to-indigo-900" },
        ]
    }
];

const Gear = () => {
    return (
        <div className="pt-24 pb-24 container">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-serif font-bold mb-6">Our Gear</h1>
                <p className="text-text-muted max-w-2xl mx-auto">
                    The tools we use to capture our adventures and work from anywhere.
                </p>
            </div>

            <div className="space-y-20">
                {gearCategories.map((category, idx) => (
                    <div key={idx}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-gray-100 rounded-full">
                                <category.icon size={24} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold">{category.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {category.items.map((item, itemIdx) => (
                                <motion.div
                                    key={itemIdx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: itemIdx * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                                >
                                    <div className={`h-48 rounded-xl bg-gradient-to-br ${item.gradient} mb-6 flex items-center justify-center text-white/20`}>
                                        {/* Placeholder for product image */}
                                        <category.icon size={48} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                    <p className="text-text-muted text-sm mb-4">{item.desc}</p>
                                    <button className="text-accent font-medium text-sm hover:underline">
                                        View on Amazon &rarr;
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gear;
