"use client";
import "leaflet/dist/leaflet.css";
import "../map.css";

import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import {
  customIcon,
  cultureIcon,
  foodIcon,
  natureIcon,
  userLocationIcon,
} from "@/utils/icons";

function Map({ gemsData }) {
  const manchesterCenter = [53.483, -2.245];
  const [position, setPosition] = useState(manchesterCenter);
  const [firstClick, setFirstClick] = useState(true);
  const mapRef = useRef(null);

  const getIcon = (category) => {
    let icon;
    switch (category) {
      case "culture":
        icon = cultureIcon;
        break;
      case "food":
        icon = foodIcon;
        break;
      case "nature":
        icon = natureIcon;
        break;
      default:
        icon = customIcon;
    }
    return icon;
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
        <Marker position={position} icon={userLocationIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>

      <button onClick={locateUser}>Find My Location</button>
    </>
  );
}

export default Map;
