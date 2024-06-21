import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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

export default function LeafletMap(props: any) {
  const { position, zoom, onMarkerDragEnd } = props;

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
        draggable={true}
        eventHandlers={{
          dragend: (event) => {
            const latlng = event.target.getLatLng();
            onMarkerDragEnd(latlng);
          },
        }}
      >
        <Popup>
          Your location <br /> {position.lat.toFixed(3)},{" "}
          {position.lng.toFixed(3)}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
