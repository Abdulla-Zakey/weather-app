# Weather Dashboard with Auth0 Authentication

A secure weather application that displays real-time weather information for multiple cities with authentication and caching.

## Features

- Real-time weather data from OpenWeatherMap
- Secure authentication with Auth0
- Multi-factor authentication via email
- 5-minute data caching for performance
- Responsive design (mobile & desktop)

## Prerequisites

- Node.js 18+ installed
- Auth0 account
- OpenWeatherMap API key

## Setup Instructions

### 1. Clone the repository

\`\`\`bash
git clone (https://github.com/Abdulla-Zakey/weather-app.git)
cd weather-app
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Configure environment variables

Create a `.env.local` file in the root directory:
`.env.local` file is attached in the email

\`\`\`

# Auth0 Configuration
AUTH0_SECRET='your-generated-32-character-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://YOUR-AUTH0-DOMAIN.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# OpenWeatherMap API
OPENWEATHERMAP_API_KEY='your-openweathermap-api-key'
\`\`\`

### 4. Run the development server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Credentials

- **Email**: careers@fidenz.com
- **Password**: Pass#fidenz

- **Important Note:** 
    The assignment requires MFA via email verification. However, email-based MFA is only available in Auth0's premium plans. As a workaround, this implementation uses Authenticator App-based MFA which is available in the free tier and provides equivalent security.
    - A QR code will be displayed for MFA enrollment
    - Open your authenticator app (Google Authenticator, Microsoft Authenticator, or Authy)
    - Scan the QR code with your authenticator app
    - Enter the 6-digit verification code shown in your app

## Technologies Used

- **Next.js 14**: React framework with API routes
- **Auth0**: Authentication and authorization
- **OpenWeatherMap API**: Weather data
- **Tailwind CSS**: Styling and responsive design
- **Axios**: HTTP client

## Architecture

### Caching Strategy
- Weather data is cached in memory for 5 minutes
- Reduces API calls to OpenWeatherMap
- Improves performance and response time

### Authentication Flow
1. User accesses the application
2. Redirected to Auth0 login page
3. After successful login, redirected back to app
4. Session is maintained via secure cookies
5. All API requests require valid session

## Project Structure

\`\`\`
weather-app/
├── app/
│   ├── api/
│   │   ├── auth/[auth0]/route.js
│   │   └── weather/route.js
│   ├── components/
│   │   ├── DashboardHeader.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── WeatherCard.jsx
│   │   └── WeatherGrid.jsx
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
│   └── favicon.ico
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── node_modules/

\`\`\`

## License

MIT