import { useCallback, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "./map.css";
import { getDistanceFromLatLonInKm } from "./utils";

interface LatLng {
  lat: number;
  lng: number;
}

interface MapHandlerProps {
  addNewPosition: (latLng: any) => void;
}

const MapHandler = ({ addNewPosition }: MapHandlerProps) => {
  useMapEvents({
    click: (event) => {
      console.log(event);
      addNewPosition(event.latlng);
    },
  });
  return null;
};

export const Map = () => {
  const [positions, setPosition] = useState<LatLng[]>([]);

  const addNewPosition = useCallback((location: LatLng) => {
    setPosition((prev) => [...prev, location]);
  }, []);

  const clearPositions = useCallback(() => {
    setPosition([]);
  }, []);

  const distance = useMemo(() => {
    let overall = 0;
    for (let i = 0; i < positions.length; i++) {
      const first = positions[i];
      const next = positions[i + 1];
      if (!next) break;
      const interDistance = getDistanceFromLatLonInKm(
        first.lat,
        first.lng,
        next.lat,
        next.lng
      );
      overall += interDistance;
    }
    return overall;
  }, [positions]);

  return (
    <div className="map-page">
      <div className="map-page__map-card map-page__map-card--left" id="mapid">
        <MapContainer center={[45.4, -75.7]} zoom={12}>
          <MapHandler addNewPosition={(latlng) => addNewPosition(latlng)} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {positions?.map(({ lat, lng }: LatLng, index) => (
            <Marker key={`${lat}${lng}${index}`} position={[lat, lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))}
          <Polyline positions={positions.map(({ lat, lng }) => [lat, lng])} />
        </MapContainer>
      </div>
      <div className="map-page__map-card map-page__map-card--right">
        <div className="map-page__map-card__distance">
          Distance: {distance.toFixed(2)} km
        </div>
        <div className="btn" onClick={clearPositions}>
          Clear
        </div>
      </div>
    </div>
  );
};
