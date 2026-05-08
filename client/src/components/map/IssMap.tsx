import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useIssStore } from '@/store/useIssStore';

// Custom ISS Icon
const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

// Component to handle map centering when position changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.panTo(center, { animate: true, duration: 1 });
  }, [center, map]);
  return null;
}

export function IssMap() {
  const { positions, isLoading, fetchIssLocation } = useIssStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-muted animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>;

  const currentPos = positions.length > 0 ? positions[positions.length - 1] : { lat: 0, lng: 0, speed: 0, timestamp: 0 };
  const positionQueue: [number, number][] = positions.map(p => [p.lat, p.lng]);

  return (
    <div className="relative h-full w-full z-0">
      <div className="absolute top-4 right-4 z-[400] flex gap-2">
        <button 
          onClick={() => fetchIssLocation()}
          disabled={isLoading}
          className="bg-primary/80 backdrop-blur-md hover:bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg transition-all text-sm font-medium border border-white/10"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Position'}
        </button>
      </div>

      <MapContainer 
        center={[currentPos.lat, currentPos.lng]} 
        zoom={4} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {positions.length > 0 && (
          <>
            <Polyline positions={positionQueue} color="#06b6d4" weight={3} opacity={0.6} dashArray="5, 10" />
            <Marker position={[currentPos.lat, currentPos.lng]} icon={issIcon}>
              <Popup className="custom-popup">
                <div className="text-sm font-medium p-1">
                  <p className="font-bold text-base mb-1">ISS Location</p>
                  <p>Lat: {currentPos.lat.toFixed(4)}</p>
                  <p>Lng: {currentPos.lng.toFixed(4)}</p>
                  <p>Speed: {currentPos.speed ? Math.round(currentPos.speed).toLocaleString() : '--'} km/h</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Updated: {new Date(currentPos.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </Popup>
            </Marker>
            <MapController center={[currentPos.lat, currentPos.lng]} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
