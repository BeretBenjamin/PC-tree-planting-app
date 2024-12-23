// components/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons not displaying correctly

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface TreeLocation {
    id: number;
    position: [number, number];
    name: string;
  }
  
  // Hardcoded tree locations, including points in Romania
  const treeLocations: TreeLocation[] = [
    { id: 1, position: [50.85045, 4.34878], name: 'Tree in Brussels' },
    { id: 2, position: [51.5074, -0.1278], name: 'Tree in London' },
    { id: 3, position: [48.8566, 2.3522], name: 'Tree in Paris' },
    { id: 4, position: [46.7712, 23.6236], name: 'Tree in Cluj-Napoca' },
    { id: 5, position: [44.4268, 26.1025], name: 'Tree in Bucharest' },
    { id: 6, position: [47.1585, 27.6014], name: 'Tree in Iași' },
    { id: 7, position: [45.7489, 21.2087], name: 'Tree in Timișoara' },
    { id: 8, position: [46.0757, 23.5795], name: 'Tree in Alba Iulia' },
    { id: 9, position: [44.9226, 13.7543], name: 'Tree in Pula' },
    { id: 10, position: [44.9226, 13.7543], name: 'Tree in Pula' },

  ];
  
  const MapComponent: React.FC = () => {
    // State to ensure the map is only rendered on the client
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true); // Ensures this only runs on the client
    }, []);
  
    // Only render the map on the client-side
    if (!isClient) return null;
  
    return (
      <MapContainer
        center={[46.0, 25.0]} // Centered on Romania and surrounding area
        zoom={6} // Suitable zoom level
        style={{ width: '80%', height: '60vh', borderRadius: '15px' }} // Adjusted width and increased height
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Neutral map style from CartoDB
        />
        {treeLocations.map((tree) => (
          <Marker key={tree.id} position={tree.position}>
            <Popup>{tree.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
  
  export default MapComponent;