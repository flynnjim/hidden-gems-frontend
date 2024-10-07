import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_GEOCODER_API_KEY

//https://geocode.maps.co/search?q=address&api_key=
const geocoderApi = axios.create({
    baseURL: "https://geocode.maps.co",
  });

  export const fetchGeocode = (address) => {
    // - /search for convert address to lat lon
    return geocoderApi.get('/search', {
        params: {
            q: address,
            api_key: API_KEY,
        },
    }).then(({ data }) => {
        return data;
    }).catch((error) => {
        console.error("Error fetching geocode data: ", error);
    });
};

export const fetchReverseGeocode = (latitude, longitude) => {
    console.log('Fetching reverse geocode...');
    // - /reverse for convert lat lon to address
    
    return geocoderApi.get('/reverse', {
      params: {
        lat: latitude,
        lon: longitude,
        api_key: API_KEY,
      },
    }).then(({ data }) => {
      console.log('Reverse Geocode Data:', data);
      return data;
    }).catch((error) => {
      console.error("Error fetching reverse geocode data: ", error);
    });
  };