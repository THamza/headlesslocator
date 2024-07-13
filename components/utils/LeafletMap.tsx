import { useEffect, useRef } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

function ChangeView({ center }: any) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center]);
  return null;
}

// Create a custom div icon for other users
const createCircularIcon = (color: string) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
    className: "",
    iconSize: [12, 12],
    iconAnchor: [6, 6], // Center the icon
  });
};

// Create a circular icon for other users
const otherUserIcon = createCircularIcon("green");

// Default Leaflet icon for current user
const currentUserIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function LeafletMap({
  position,
  zoom,
  radius,
  fixedMarker = false,
  users = [],
  onMarkerDragEnd,
}: any) {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setRadius(radius * 1000); // Convert radius to meters
    }
  }, [radius]);

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ChangeView center={position} />
      <Marker
        position={position}
        draggable={!fixedMarker}
        icon={currentUserIcon}
        eventHandlers={{
          dragend: (event) => {
            const marker = event.target;
            const newPosition = marker.getLatLng();
            onMarkerDragEnd(newPosition);
          },
        }}
      >
        <Popup>
          Your location <br /> {position.lat.toFixed(3)},{" "}
          {position.lng.toFixed(3)}
        </Popup>
      </Marker>
      {radius && (
        <Circle
          ref={mapRef}
          center={position}
          radius={radius * 1000} // Convert radius to meters
          fillColor="blue"
          color="blue"
        />
      )}
      {users.map((user: any) => (
        <Marker
          key={user.id}
          position={{ lat: user.latitude, lng: user.longitude }}
          icon={otherUserIcon}
        >
          <Popup>
            {user.firstName} {user.lastName}
            <br />
            {user.email}
            <br />
            {user.telegram}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
