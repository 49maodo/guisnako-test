import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type Props = {
    lat: number;
    lng: number;
    label?: string;
    className?: string;
};

export function MapView({ lat, lng, label }: Props) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={13}
            // style={{ width: "100%", height: "100%" }}
            scrollWheelZoom={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]}>
                <Popup>{label}</Popup>
            </Marker>
        </MapContainer>
    );
}