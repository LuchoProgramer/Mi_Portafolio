import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const technologies = [
    { name: 'HTML5', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/Html_fsy4r4.svg', level: 90 },
    { name: 'CSS3', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936864/css_xo6me2.svg', level: 85 },
    { name: 'JavaScript', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/javascript_j7f2hr.svg', level: 80 },
    { name: 'React', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/react-logo_epcclf.svg', level: 75 },
    { name: 'Tailwind CSS', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/Tailwind_CSS_Logo_wmitwx.svg', level: 70 },
    { name: 'Python', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936863/Python-logo_s8sw7e.svg', level: 85 },
    { name: 'Django', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936864/django-logo_vlklt7.svg', level: 80, className: 'logo-django' },
    { name: 'Git', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/Git-Icon_ewxnwp.svg', level: 90 },
    { name: 'GitHub', logo: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731936862/github-logo_xuuiyh.svg', level: 88 },
];

const Technologies = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const updateDarkMode = () => {
            const darkModeClass = document.documentElement.classList.contains('dark');
            setIsDarkMode(darkModeClass);
        };

        updateDarkMode();

        const observer = new MutationObserver(updateDarkMode);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="py-8 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-center mb-6 text-text-primary dark:text-text-light">
                Tecnologías
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech) => {
                    const pathColor = isDarkMode ? '#60A5FA' : '#3B82F6';
                    const textColor = isDarkMode ? '#FFFFFF' : '#374151';
                    const trailColor = isDarkMode ? '#374151' : '#d1d5db';

                    return (
                        <div
                            key={tech.name}
                            className="group flex flex-col items-center p-4 bg-background-light dark:bg-background-dark rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
                            style={{ width: '150px' }}
                        >
                            <div className="w-16 h-16 mb-2">
                                <CircularProgressbar
                                    value={tech.level}
                                    text={`${tech.level}%`}
                                    styles={buildStyles({
                                        textSize: '16px',
                                        pathColor: pathColor,
                                        textColor: textColor,
                                        trailColor: trailColor,
                                    })}
                                />
                            </div>
                            <img
                                src={tech.logo}
                                alt={`${tech.name} logo`}
                                className={`w-12 h-12 mb-2 ${tech.name === 'Django' ? 'dark:bg-gray-200 p-2 rounded' : ''
                                    }`}
                            />
                            <h3 className="text-md font-semibold mb-1 text-center text-text-primary dark:text-text-light">
                                {tech.name}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Technologies;