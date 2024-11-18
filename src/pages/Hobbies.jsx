// Hobbies.jsx
import React from 'react';
import { FaHiking, FaGuitar, FaPizzaSlice, FaPlane, FaFireAlt } from 'react-icons/fa';

function Hobbies() {
    const hobbies = [
        { icon: <FaHiking size={40} />, label: 'Trekking' },
        { icon: <FaGuitar size={40} />, label: 'Tocar la guitarra' },
        { icon: <FaFireAlt size={40} />, label: 'Parrilladas' },
        { icon: <FaPizzaSlice size={40} />, label: 'Comer pizza' },
        { icon: <FaPlane size={40} />, label: 'Viajar' },
    ];

    return (
        <section className="p-8 bg-background-light dark:bg-background-dark">
            <h2 className="text-3xl font-bold text-center mb-6 text-text-primary dark:text-text-light">
                Mis Hobbies
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {hobbies.map((hobby, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-gray-700 dark:text-gray-300"
                    >
                        {hobby.icon}
                        <span className="mt-2 text-sm">{hobby.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Hobbies;