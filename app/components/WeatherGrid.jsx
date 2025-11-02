import { Loader2 } from 'lucide-react';
import WeatherCard from './WeatherCard';

export default function WeatherGrid({ cities, weatherData, loading }) {
    if (loading) {
        return (
            <div className="text-white text-center text-2xl">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                <p>Loading weather data...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map(city => (
                <WeatherCard
                    key={city.CityCode}
                    city={city}
                    weather={weatherData[city.CityCode]}
                />
            ))}
        </div>
    );
}