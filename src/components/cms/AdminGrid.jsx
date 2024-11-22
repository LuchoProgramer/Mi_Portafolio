import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const AdminGrid = ({ initialLayout, onLayoutChange }) => {
    const [layout, setLayout] = useState(initialLayout);

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        onLayoutChange(newLayout); // Notificar al padre
    };

    return (
        <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
            onLayoutChange={handleLayoutChange}
            isDraggable
            isResizable
        >
            {layout.map((item) => (
                <div key={item.i} className="bg-gray-200 p-4 rounded shadow">
                    <p>Bloque {item.i}</p>
                </div>
            ))}
        </GridLayout>
    );
};

export default AdminGrid;
