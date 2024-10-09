"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "../map.css";
import { useState, useRef, useEffect } from "react";
import {
  getCustomIcon,
  getCultureIcon,
  getFoodIcon,
  getNatureIcon,
  getUserLocationIcon,
} from "@/utils/icons";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const useMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMap),
  { ssr: false }
);

function Map({ gemsData }) {
  const manchesterCenter = [53.483, -2.245];
  const [position, setPosition] = useState(manchesterCenter);
  const [firstClick, setFirstClick] = useState(true);
  const mapRef = useRef(null);

  // State for icons
  const [icons, setIcons] = useState({});

  useEffect(() => {
    // Dynamically import Leaflet for client-side use
    import("leaflet").then((L) => {
      setIcons({
        customIcon: getCustomIcon(L),
        cultureIcon: getCultureIcon(L),
        foodIcon: getFoodIcon(L),
        natureIcon: getNatureIcon(L),
        userLocationIcon: getUserLocationIcon(L),
      });
    });
  }, []);

  const getIcon = (category) => {
    switch (category) {
      case "culture":
        return icons.cultureIcon;
      case "food":
        return icons.foodIcon;
      case "nature":
        return icons.natureIcon;
      default:
        return icons.customIcon;
    }
  };

  const locateUser = () => {
    if (mapRef.current) {
      mapRef.current.locate().on("locationfound", (e) => {
        setPosition(e.latlng);
        if (firstClick) {
          mapRef.current.flyTo(e.latlng, mapRef.current.getZoom());
          setFirstClick(false);
        }
      });
    }
  };

  const FindUser = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  if (!icons.customIcon) return null; // Avoid rendering until icons are loaded

  return (
    <>
      <MapContainer
        className="map-container"
        center={manchesterCenter}
        zoom={12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gemsData.map((gem) => {
          const {
            latitude,
            longitude,
            title,
            gem_id,
            category,
            rating,
            img_url,
          } = gem;
          const icon = getIcon(category);
          return (
            <Marker key={gem_id} position={[latitude, longitude]} icon={icon}>
              <Popup>
                {title} {rating} <img src={img_url} alt={title} />
              </Popup>
            </Marker>
          );
        })}
        <FindUser />
        <Marker position={position} icon={icons.userLocationIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>

      <button onClick={locateUser}>Find My Location</button>
    </>
  );
}

export default Map;
