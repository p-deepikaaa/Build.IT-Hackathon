import {
  MapContainer,
  TileLayer,
 Marker,
  Popup,
  Circle,
} from "react-leaflet";

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
      ">
      </div>
    `,
    className: "",
    iconSize: [20, 20],
  });
}

const hub = [12.9716, 77.5946];

function MapCard({ points }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow bg-white">

      <MapContainer
        center={hub}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >

        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={hub}
          radius={1000}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#3b82f6",
            fillOpacity: 0.15,
          }}
        />

        {points.map((point) => (

          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
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
                {point.kind}
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