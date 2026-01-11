🧩 Orthoplex Frontend Challenge – React Dashboard

A modern React + Vite frontend application built for the Orthoplex Solutions Frontend Challenge.
The project demonstrates clean architecture, authentication flow, protected routes, data visualization, and testing best practices.

🌐 Live Features Overview
✅ Authentication

Login & Registration flow

Strong client-side validation

Auth state persisted in localStorage

Protected dashboard route

📊 Dashboard

Fetches real data from public API

Transforms API data for analytics

Displays data using charts (Recharts)

Responsive, modern card-based layout

🎨 UI & Branding

Orthoplex logo & brand header

Full-page background wallpaper

Clean enterprise color palette

Loading indicators & favicon states

🧪 Testing

Unit & integration tests using Vitest

API mocking

Auth context testing

Dashboard behavior validation

🧱 Tech Stack
Technology	Purpose
React 19	UI framework
Vite	Build tool & dev server
React Router v7	Routing
Axios	HTTP client
Recharts	Charts & graphs
Vitest	Testing framework
Testing Library	UI testing
ESLint	Code quality
📁 Project Structure
orthoplex-react/
├── public/
│   ├── assets/
│   │   ├── orthoplex-logo.png
│   │   └── orthoplex-bg.jpg
│   ├── favicon.ico
│   └── favicon-loading.ico
│
├── src/
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Loader.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.test.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── Dashboard.css
│
├── package.json
├── vite.config.js
└── README.md

🔐 Authentication Flow

User registers with validation:

Username ≥ 3 characters

Valid email format

Password ≥ 8 chars, uppercase + number

Login stores user data in localStorage

AuthContext manages global auth state

Dashboard is protected via ProtectedRoute

📊 Dashboard Data & Charts

API: https://jsonplaceholder.typicode.com/posts

Data is fetched once using a centralized API layer

Data is transformed into analytics metrics:

titleLength

bodyLength

Charts Used:

Line Chart → Title length trend

Bar Chart → Body length comparison

All charts are:

Responsive

Accessible

Reusable

Tested

🧪 Testing Strategy
Tools:

Vitest

@testing-library/react

vi.mock() for API mocking

Coverage Includes:

Loader display during fetch

API call success & failure

Empty data handling

Auth-based rendering

API call count validation

Run tests with:

npm run test

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/orthoplex-react.git
cd orthoplex-react

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev


App will run at:

http://localhost:5173

🧠 Design Decisions

Vite for faster builds and HMR

Context API for auth (simple & effective)

Recharts for clean data visualization

CSS Modules approach for scoped styling

Single API source of truth (used by UI & tests)

🖼 Loading & Favicon Handling

favicon-loading.ico shown during page load

Automatically switches to favicon.ico once loaded

Enhances perceived performance & UX

🚀 Future Improvements

Backend integration (JWT, refresh tokens)

Role-based access control

Pagination & filtering

Dark/light theme toggle

Proper database
