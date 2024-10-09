"use client";
import L from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../map.css";

const customIcon = new L.Icon({
  iconUrl:
    "https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/icons%2FUntitled_Artwork%202.png?alt=media&token=c03ce89c-a76f-4435-a3f1-352b875e20eb",
  iconSize: [60, 54],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],

  shadowSize: [41, 41],
});

const manchesterCenter = [53.483, -2.245];

const LocationMarker = ({
  setLatitude,
  setLongitude,
  position,
  setPosition,
}) => {
  useMapEvents({
    click(e) {
      console.log(position);
      setPosition(e.latlng);
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You already clicked here!</Popup>
    </Marker>
  );
};

const AddGemMap = ({ setLatitude, setLongitude, position, setPosition }) => {
  return (
    <>
      <MapContainer
        center={manchesterCenter}
        zoom={13}
        scrollWheelZoom={false}
        className="add-gem-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          position={position}
          setPosition={setPosition}
        />
      </MapContainer>
    </>
  );
};

export default AddGemMap;
