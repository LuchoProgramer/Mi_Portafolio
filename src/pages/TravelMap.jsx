// src/components/TravelMap.jsx
import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import ThemeContext from '../ThemeContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../assets/TravelMap.css';

const travelRoute = [
    { name: 'Quito', coords: [-0.1807, -78.4678], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947461/Quito_gag520.jpg' },
    { name: 'Cuenca', coords: [-2.9006, -79.0045], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947486/Cuenca_i5hdbb.jpg' },
    { name: 'Cajamarca', coords: [-7.1617, -78.5127], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947491/Cajamarca_zogcqe.jpg' },
    { name: 'Lima', coords: [-12.0464, -77.0428], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947469/Lima_jyydej.jpg' },
    { name: 'Ica', coords: [-14.0678, -75.7286], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947480/Ica_twxaja.jpg' },
    { name: 'Arequipa', coords: [-16.409, -71.5375], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947915/Arequipa_hwgn5v.jpg' },
    { name: 'Lago Titicaca - Copacabana', coords: [-16.1679, -69.0851], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947490/Copacabana_Lagotiticaca_ugnw5r.jpg' },
    { name: 'La Paz', coords: [-16.5000, -68.1500], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947474/La_paz_jmkaex.jpg' },
    { name: 'Uyuni', coords: [-20.4603, -66.8267], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947454/Uyuni_wexgfb.jpg' },
    { name: 'Vilazon', coords: [-22.0913, -65.5968], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947453/Villazon_bbuxpw.jpg' },
    { name: 'La Quiaca', coords: [-22.105, -65.5957], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947473/La_quiaca_v9kjyl.jpg' },
    { name: 'Jujuy', coords: [-24.1858, -65.2995], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947474/Jujuy_gn7ru6.jpg' },
    { name: 'Tucuman', coords: [-26.8083, -65.2176], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947456/Tucuman_e9v6kp.jpg' },
    { name: 'Cordoba', coords: [-31.4201, -64.1888], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947491/Cordoba_ce1vka.jpg' },
    { name: 'Mendoza', coords: [-32.8895, -68.8458], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947466/Mendoza_yp6hzm.jpg' },
    { name: 'Buenos Aires', coords: [-34.6037, -58.3816], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947492/Buenos_Aires_mxuh6w.jpg' },
    { name: 'Viedma', coords: [-40.8135, -62.9967], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947454/Viedma_kkmtfk.jpg' },
    { name: 'San Antonio Oeste', coords: [-40.7311, -64.9476], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947457/San_Antonio_Oeste_xyeilw.jpg' },
    { name: 'Villa Traful', coords: [-40.661, -71.3967], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947453/Villa_Traful_d34imj.jpg' },
    { name: 'Bariloche', coords: [-41.1335, -71.3103], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947680/Bariloche_a0cgpn.jpg' },
    { name: 'El Bolson', coords: [-41.9603, -71.5333], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947485/El_Bolson_fswr1r.jpg' },
    { name: 'El Chalten', coords: [-49.3315, -72.8863], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947485/El_chalten_ximqjf.jpg' },
    { name: 'Glaciar Perito Moreno', coords: [-50.495, -73.0533], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947480/Glaciar_Perito_Moreno_n79lor.jpg' },
    { name: 'Rio Gallegos', coords: [-51.623, -69.2168], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947459/Rio_Gallegos_eps9iv.jpg' },
    { name: 'Ushuaia', coords: [-54.8019, -68.3029], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947455/Ushuaia_kxyt45.jpg' },
    { name: 'Montevideo', coords: [-34.9011, -56.1645], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947465/Montevideo_xp1bxy.jpg' },
    { name: 'Punta del Este', coords: [-34.9508, -54.9508], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947463/Punta_del_este_qzebol.jpg' },
    { name: 'Rocha', coords: [-34.4823, -54.3334], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947458/Rocha_mlr1ys.jpg' },
    { name: 'Cabo Polonio', coords: [-34.3995, -53.7817], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947491/Cabo_Polonio_fpxipo.jpg' },
    { name: 'Pelotas', coords: [-31.7719, -52.342], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947464/Pelotas_twajuj.jpg' },
    { name: 'Cataratas del Iguazu', coords: [-25.6953, -54.4367], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947479/Iguazu_mcdosk.jpg' },
    { name: 'Florianopolis', coords: [-27.5954, -48.548], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947482/Florianopolis_efyegd.jpg' },
    { name: 'Ilhabela', coords: [-23.7785, -45.3584], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947476/Ilhabella_yamo7e.jpg' },
    { name: 'Rio de Janeiro', coords: [-22.9068, -43.1729], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947460/Rio_de_Janeiro_s7cuql.jpg' },
    { name: 'Arraial do Cabo', coords: [-22.9671, -42.0263], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947796/Arraial_do_cabo_wtwr7k.jpg' },
    { name: 'Manaus', coords: [-3.1190, -60.0217], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947468/Manaus_ywqxkn.jpg' },
    { name: 'Leticia', coords: [-4.215, -69.9406], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947470/Leticia_up7i4l.jpg' },
    { name: 'Bogota', coords: [4.711, -74.0721], img: 'https://res.cloudinary.com/dltfsttr7/image/upload/v1731947560/Bogota_qvgvcl.jpg' },
];


const createCustomIcon = (color, icon) => {
    return L.AwesomeMarkers.icon({
        icon: icon,
        markerColor: color,
        prefix: 'fa',
        iconColor: 'white',
    });
};

function TravelMap() {
    const { isDark } = useContext(ThemeContext);

    const tileLayerUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    return (
        <section
            id="travel"
            className="py-12 bg-gray-100 dark:bg-gray-900"  // Cambié py-20 a py-12
            style={{ height: '600px' }}
        >
            <div className="max-w-5xl mx-auto px-4" style={{ height: '100%' }}>
                <h2 className="text-3xl font-bold text-center mb-8">
                    Lugares que he Visitado
                </h2>

                <MapContainer
                    center={[-20.0, -60.0]}
                    zoom={3}
                    scrollWheelZoom={false}
                    className="h-96 rounded-lg shadow-md map-container"
                >
                    <TileLayer
                        key={tileLayerUrl}
                        url={tileLayerUrl}
                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />

                    {travelRoute.map((location, index) => (
                        <Marker
                            key={index}
                            position={location.coords}
                            icon={createCustomIcon('blue', 'map-marker-alt')}
                        >
                            <Tooltip
                                direction="top"
                                offset={[0, -20]}
                                opacity={1}
                                className="tooltip"
                                permanent={false}
                            >
                                <div className="bg-white dark:bg-gray-veryDark bg-opacity-90 border rounded-lg p-2 text-sm text-gray-dark dark:text-gray-light text-center shadow-lg w-36 max-w-36 min-h-40 flex flex-col items-center justify-center">
                                    <h3 className="font-bold truncate">{location.name}</h3>
                                    {location.img && (
                                        <img
                                            src={location.img}
                                            alt={location.name}
                                            className="w-24 h-auto max-h-20 object-cover aspect-[4/3] rounded-md mt-1"
                                        />
                                    )}
                                </div>
                            </Tooltip>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </section>
    );
}

export default TravelMap;