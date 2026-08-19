import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

 const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;

const AdminProtectedRoute = () => {
    const [status, setStatus] = useState('loading'); // 'loading', 'authorized', 'unauthorized'
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setStatus('unauthorized');
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/verify`, {
                    method: 'GET',
                    headers: {
                        // This is what your 'protect' middleware looks for!
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setStatus('authorized');
                } else {
                    // If middleware returns 401 (Expired/Invalid), we land here
                    localStorage.removeItem('adminToken');
                    setStatus('unauthorized');
                }
            } catch (error) {
                console.error("Auth check failed", error);
                setStatus('unauthorized');
            }
        };

        checkAuth();
    }, [token]);

    
console.log("Current Status:", status); // DEBUG
    
    // 1. Show nothing or a spinner while the backend is checking the token
    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

 
   if (status === 'authorized') {
        console.log("Rendering Outlet"); // DEBUG
        return <Outlet />;
    }

    return <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;