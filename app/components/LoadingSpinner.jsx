import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-400 to-blue-600">
            <div className="text-white text-center">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                <p className="text-2xl">{message}</p>
            </div>
        </div>
    );
}