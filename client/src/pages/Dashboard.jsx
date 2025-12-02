import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-background">
            <nav className="bg-surface shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-primary">WellNest</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-text">Welcome, {user?.fullName}</span>
                            <button
                                onClick={logout}
                                className="p-2 rounded-full hover:bg-gray-100 text-text-muted hover:text-text"
                                title="Sign out"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Placeholder Widgets */}
                        <div className="bg-surface overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-text">Mood Tracker</h3>
                                <div className="mt-2 max-w-xl text-sm text-text-muted">
                                    <p>How are you feeling today?</p>
                                </div>
                                <div className="mt-5">
                                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-secondary hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                                        Log Mood
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-text">Daily Connection</h3>
                                <div className="mt-2 max-w-xl text-sm text-text-muted">
                                    <p>You haven't checked in with Mom today.</p>
                                </div>
                                <div className="mt-5">
                                    <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                        Send a Wave
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-text">Sleep Quality</h3>
                                <div className="mt-2 max-w-xl text-sm text-text-muted">
                                    <p>7h 30m sleep recorded last night.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
