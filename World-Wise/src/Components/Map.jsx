import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CiteiesContext";
import { latLng, map } from "leaflet";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";
// Programmatic navigation means to move to an URL without having to click in any click
// we can

function Map() {
  // reading the lat and lng (see CityItem)
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function () {
     if(geoLocationPosition) setMapPosition([geoLocationPosition.lat , geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  // Sync Mechanism
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      
      {!geoLocationPosition ? (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      ) : (
        // (this is just an experiment)
        <Button type = "position" >
          {"This is Your Location"}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// I know it's so ugly and it's so weird but I like to play with code and do some experiments for learning purposes :)

const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat${e.latlng.lat}&lng${e.latlng.lng}`),
  });
};
export default Map;
