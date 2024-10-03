"use client";
import "leaflet/dist/leaflet.css";
import "../map.css";
import L from "leaflet";
import { fetchGems } from "@/api/api";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

function Map() {
  const [gemsData, setGemsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const manchesterCenter = [53.483, -2.245];
  const [position, setPosition] = useState(manchesterCenter);
  const [firstClick, setFirstClick] = useState(true);

  const customIcon = new L.Icon({
    iconUrl:
      "https://static-00.iconduck.com/assets.00/gem-icon-2048x1820-nw1vrj8g.png",
    iconSize: [50, 44],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const cultureIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/214/214351.png",
    iconSize: [50, 44],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const foodIcon = new L.Icon({
    iconUrl:
      "https://firebasestorage.googleapis.com/v0/b/fir-project-28217.appspot.com/o/icons%2Fcutlery.png?alt=media&token=7ffbde5f-2345-4a65-861b-113c1c43b32d",
    iconSize: [50, 44],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const natureIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/8635/8635683.png",
    iconSize: [50, 44],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
    fetchGems().then((gems) => {
      setGemsData(gems);
    });
  }, []);

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

  const FindUser = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },

      locationfound(e) {
        setPosition(e.latlng);
        if (firstClick) {
          map.flyTo(e.latlng, map.getZoom());
          setFirstClick(false);
        }
      },
    });
    return (
      <Marker position={position} icon={customIcon}>
        <Popup>You are here!</Popup>
      </Marker>
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
        {gemsData.map((gem, index) => {
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
          //   console.log(img_url[0]);
          return (
            <Marker key={gem_id} position={[latitude, longitude]} icon={icon}>
              <Popup>
                {title} {rating}{" "}
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3-tQciY90p_grchQZkdICyzAGcdTYsRDfjw&s" />
              </Popup>
            </Marker>
          );
        })}
        <FindUser />
      </MapContainer>
      {/* <button onClick={locateUser}>Find my location</button> */}
    </>
  );
}

export default Map;
