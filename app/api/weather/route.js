import axios from 'axios';

// In-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request) {
    // Check authentication via cookie
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken) {
        console.log('Unauthorized access attempt to weather API');
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = request.cookies.get('user_email')?.value;
    console.log(`Authenticated user: ${userEmail}`);

    try {
        const { searchParams } = new URL(request.url);
        const cityId = searchParams.get('cityId');

        if (!cityId) {
            return Response.json({ error: 'City ID is required' }, { status: 400 });
        }

        // Check cache
        const cachedData = cache.get(cityId);
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            console.log(`✅ Serving cached data for city ${cityId}`);
            return Response.json({ ...cachedData.data, cached: true });
        }

        // Fetch from OpenWeatherMap
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;

        if (!apiKey) {
            console.error('OpenWeatherMap API key not found!');
            return Response.json({ error: 'API key not configured' }, { status: 500 });
        }

        console.log(`Fetching weather for city ${cityId} from API...`);
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`
        );

        const weatherData = {
            name: response.data.name,
            description: response.data.weather[0].description,
            temp: response.data.main.temp,
            icon: response.data.weather[0].icon,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
        };

        // Store in cache
        cache.set(cityId, {
            data: weatherData,
            timestamp: Date.now(),
        });

        console.log(`Weather data cached for city ${cityId}`);
        return Response.json(weatherData);

    } catch (error) {
        console.error('Weather API error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        return Response.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}