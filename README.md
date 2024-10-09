# Hidden Gems - Frontend

A web application that allows users to discover, review, and comment on hidden gems (places) using a Next.js frontend and an Express backend.

## Project Overview

This project is a Next.js web application used primarily for routing and layout. It is connected to an Express backend that handles all data-related operations. Users can explore hidden gems, submit reviews, and engage with the platform through dynamic content rendering.

## Features

- Next.js File-based Routing: Efficient routing system using the file structure.
- Dynamic Page Layouts: Pages and layouts built with React components.
- API Integration with Express Backend: All data (users, gems, comments) is fetched from the backend using Axios.
- Interactive Map: Leaflet is used for displaying gem locations on a map.
- Firebase Avatar Selection: Firebase is used for storing and selecting user avatars during signup.
- Tailwind CSS: Used for styling the components.

## Tech Stack

Frontend:

- Next.js (File Routing & Layout)
- React
- Tailwind CSS
- Axios for API requests
- Leaflet for displaying maps
- Firebase for managing avatars
- GeoCode.maps.co API for geocoding

Backend:

- Express.js (handled separately)
- Database:
- PostgreSQL (integrated via the backend)

## Installation

Ensure you have the following installed:

Node.js (v14.x or later)
npm (v6.x or later)

1. Clone the repository:
   `https://github.com/flynnjim/hidden-gems-frontend.git`

2. Navigate to the project directory:
   `cd hidden-gems-frontend`

3. Install dependencies:
   `npm install`

4. Set up environment variables in a .env.local file:
   `NEXT_PUBLIC_API_URL=<Your Express Backend API URL>`
   `NEXT_PUBLIC_FIREBASE_API_KEY=<Your Firebase API key>`
   `NEXT_PUBLIC_GEOCODER_API_KEY=<Your Geocode.maps.co API key> `

5. To run the app in development mode:
   `npm run dev`
   The application will be available at http://localhost:3000.

6. To build and run the app in production:
   `npm run build`
   `npm run start`
