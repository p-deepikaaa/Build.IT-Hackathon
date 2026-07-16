import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect } from "react";
import L from "leaflet";
import { Link } from "react-router-dom";

function markerIcon(color) {
  return L.divIcon({
    html: `
      <div style="
        width:20px;
        height:20px;
        background:${color};
        border-radius:50%;
        border:3px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
      ">
      </div>
    `,
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

// Default center used only when there are no markers
const defaultCenter = [12.9716, 77.5946];

function FitMapToPoints({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) {
      return;
    }

    // If there is only one marker, center directly on it
    if (points.length === 1) {
      map.setView(
        [points[0].lat, points[0].lng],
        15
      );

      return;
    }

    // If there are multiple markers,
    // automatically fit the map to show all of them
    const bounds = L.latLngBounds(
      points.map((point) => [
        point.lat,
        point.lng,
      ])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 15,
    });

  }, [map, points]);

  return null;
}

function MapCard({ points = [] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow">

      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Automatically move map to real markers */}
        <FitMapToPoints points={points} />

        {points.map((point) => (

          <Marker
            key={point.id}
            position={[
              point.lat,
              point.lng,
            ]}
            icon={markerIcon(
              point.kind === "need"
                ? "#ef4444"
                : "#22c55e"
            )}
          >

            <Popup>

              <h3 className="font-semibold">
                {point.title}
              </h3>

              <p className="text-sm">
                {point.kind === "need"
                  ? "Help Request"
                  : "Available Resource"}
              </p>

              <Link
                to="/dashboard"
                className="text-blue-600"
              >
                View →
              </Link>

            </Popup>

          </Marker>

        ))}

      </MapContainer>

    </div>
  );
}

export default MapCard;