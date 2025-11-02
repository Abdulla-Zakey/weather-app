import { CloudSun, Lock } from 'lucide-react';
import Link from 'next/link';

export default function LoginScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
                <div className="mb-6">
                    <CloudSun className="w-24 h-24 mx-auto mb-4 text-blue-500" />
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Weather Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Secure weather information with Auth0
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Lock className="w-4 h-4 text-gray-700" />
                        <p className="text-sm text-gray-700">
                            This application requires authentication
                        </p>
                    </div>
                    <p className="text-xs text-gray-600">
                        Multi-factor authentication enabled for security
                    </p>
                </div>

                <Link
                    href="/api/auth/login"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-block transition-colors w-full"
                >
                    Log In with Auth0
                </Link>
            </div>
        </div>
    );
}