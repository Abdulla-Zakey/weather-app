import { CloudSun } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHeader({ userEmail }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <CloudSun className="w-12 h-12 text-white" />
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Weather Dashboard
                    </h1>
                </div>
                <p className="text-blue-100">Real-time weather information</p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-right">
                    <p className="text-white text-sm">Welcome back!</p>
                    <p className="text-white font-semibold">{userEmail}</p>
                </div>
                <Link
                    href="/api/auth/logout"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}