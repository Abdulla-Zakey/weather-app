import { AlertTriangle, Package, Droplets, Wind, Loader2 } from 'lucide-react';

export default function WeatherCard({ city, weather }) {
    if (weather?.error) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {city.CityName}
                </h2>
                <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                    <p className="text-red-500 mb-2">Failed to load</p>
                    <p className="text-xs text-gray-500">Please try again later</p>
                </div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {city.CityName}
                </h2>
                <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {weather.name || city.CityName}
            </h2>

            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-5xl font-bold text-gray-900">
                        {Math.round(weather.temp)}°C
                    </p>
                    <p className="text-gray-600 capitalize mt-2 text-sm">
                        {weather.description}
                    </p>
                </div>
                {weather.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt="Weather icon"
                        className="w-20 h-20"
                    />
                )}
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 rounded-lg p-2">
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Droplets className="w-3 h-3" />
                            <span>Humidity</span>
                        </div>
                        <p className="font-semibold text-gray-800">{weather.humidity}%</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2">
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Wind className="w-3 h-3" />
                            <span>Wind</span>
                        </div>
                        <p className="font-semibold text-gray-800">{weather.windSpeed} m/s</p>
                    </div>
                </div>
            </div>

            {weather.cached && (
                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-600">
                    <Package className="w-3 h-3" />
                    <span>Cached data</span>
                </div>
            )}
        </div>
    );
}