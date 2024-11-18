import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Languages() {
    const languages = [
        { idioma: 'Español', nivel: 100, color: '#1E3A8A' }, // Nivel nativo (100%)
        { idioma: 'Inglés', nivel: 75, color: '#10B981' },   // Nivel B2 (75%)
        { idioma: 'Portugués', nivel: 50, color: '#F59E0B' }, // Nivel B1 (50%)
    ];

    return (
        <section id="languages" className="py-20 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Idiomas</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {languages.map((lang, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-24 h-24 mb-3">
                                <CircularProgressbar
                                    value={lang.nivel}
                                    text={`${lang.nivel}%`}
                                    styles={buildStyles({
                                        textSize: '16px',
                                        pathColor: lang.color,
                                        textColor: lang.color,
                                        trailColor: '#d1d5db',
                                    })}
                                />
                            </div>
                            <h3 className="text-xl font-semibold">{lang.idioma}</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {`Nivel: ${lang.nivel === 100 ? 'Nativo' : lang.nivel === 75 ? 'B2' : 'B1'}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Languages;