import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_GEOCODER_API_KEY

//https://geocode.maps.co/search?q=address&api_key=
const geocoderApi = axios.create({
    baseURL: "https://geocode.maps.co",
  });

  export const fetchGeocode = (address) => {
    console.log('HELLO');

    // - /search for convert address to lat lon
    
    return geocoderApi.get('/search', {
        params: {
            q: address,
            api_key: API_KEY,
        },
    }).then(({ data }) => {
        return data;
        
        return data;
    }).catch((error) => {
        console.error("Error fetching geocode data:", error);
    });
};