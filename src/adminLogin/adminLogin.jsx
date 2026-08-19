import  { useState } from 'react';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;


const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Save token and redirect
            console.log(data);
            localStorage.setItem('adminToken', data.token);
            window.location.href = '/dashboard'; 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
             
    };

    

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-xl mb-4 shadow-lg shadow-indigo-200">
                        <Lock className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Admin Portal</h1>
                    <p className="text-slate-500 mt-2">Please sign in to access the dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm animate-shake">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800"
                                placeholder="Enter username"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-800"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} Admin Management System
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;