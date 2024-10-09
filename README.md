Hidden Gems - Frontend
A web application that allows users to discover, review, and comment on hidden gems (places) using a Next.js frontend and an Express backend.

Project Overview
This project is a Next.js web application that integrates with an Express backend to showcase hidden gems around various places. Users can explore gems, read and post reviews, and interact with the platform through features like comment submission, user authentication, and image optimization.

Features
Next.js File-based Routing: Efficient routing system using the file structure.
Dynamic Page Layouts: Pages and layouts built with React components.
API Integration with Express Backend: All data (users, gems, comments) is fetched from the backend using Axios.
Interactive User Experience: Users can post,submit comments and reviews, handled through the Express backend.
Tailwind CSS: Used for styling the components.

Tech Stack
Frontend:
Next.js (File Routing & Layout)
React
Tailwind CSS
Axios for API requests
Backend:
Express.js (handled separately)
Database:
PostgreSQL (integrated via the backend)
Installation
Prerequisites
Ensure you have the following installed:

Node.js (v14.x or later)
npm (v6.x or later)
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-repo/hidden-gems-frontend.git
Navigate to the project directory:

bash
Copy code
cd hidden-gems-frontend
Install dependencies:

bash
Copy code
npm install
Configuration
Set up environment variables in a .env.local file:

bash
Copy code
NEXT_PUBLIC_API_URL=<Your Express Backend API URL>
NEXT_PUBLIC_FIREBASE_API_KEY=<Your Firebase API key>
Running the Application
Development Mode
To run the app in development mode:

bash
Copy code
npm run dev
The application will be available at http://localhost:3000.

Production Mode
To build and run the app in production:

bash
Copy code
npm run build
npm run start
File Structure
bash
Copy code
.
├── public/ # Static assets
│ ├── avatars/ # User avatars
│ ├── images/ # Gem images
│ └── favicon.ico # Favicon
├── src/ # Source files
│ ├── api/ # Axios API configuration
│ ├── app/ # Application pages (Next.js)
│ ├── components/ # Reusable components (Header, Footer, etc.)
│ ├── firebase/ # Firebase integration
│ └── styles/ # Global styles, Tailwind config
├── .eslintrc.json # ESLint configuration
├── next.config.mjs # Next.js configuration
├── postcss.config.mjs # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── package.json # Dependencies and scripts
└── README.md # Project documentation
