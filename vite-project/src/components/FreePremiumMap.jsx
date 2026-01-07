import React, { useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function FreePremiumMap({ className = "" }) {
  const locations = useMemo(
    () => [
      { name: "Pune", lat: 18.5204, lng: 73.8567 },
      { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
      { name: "Bhandara", lat: 21.1777, lng: 79.657 },
      { name: "Gondia", lat: 21.4624, lng: 80.221 },
      { name: "Chandrapur", lat: 19.9615, lng: 79.2961 },
    ],
    []
  );

  const [selected, setSelected] = useState(null);

  return (
    // <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl ${className}`}>

      {/* Header */}
      <div className="absolute left-6 top-6 z-[1000] max-w-[70%] rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">
        <p className="text-xs font-semibold tracking-widest text-slate-300">
          Maharashtra • India
        </p>
        <h3 className="mt-1 text-2xl font-bold text-white">Our Presence</h3>
        <p className="mt-1 text-sm text-slate-200/80">
          Click marker to view location.
        </p>
        <div className="mt-2 text-sm font-semibold text-white">
          Selected: <span className="text-slate-200">{selected ?? "—"}</span>
        </div>
      </div>

      {/* Map */}
      {/* <div className="h-[360px] sm:h-[460px]"> */}
      <div className="h-full">

        <MapContainer
          center={[20.7, 78.5]}
          zoom={5.6}
          scrollWheelZoom={false}
          className="h-full w-full"
        >

          <TileLayer
            // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"  // dark
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // light, google ssarkh

            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          />

          {locations.map((p) => (
            <Marker
              key={p.name}
              position={[p.lat, p.lng]}
              eventHandlers={{
                click: () => setSelected(p.name),
              }}
            >
              <Popup>
                <div className="font-semibold">{p.name}</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  Branch / Presence
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Cinematic fade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
    </div>
  );
}
