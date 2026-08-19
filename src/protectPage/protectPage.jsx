import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means "checking"
  const location = useLocation();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      console.log(token);

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/verify`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure your 'protect' middleware expects this format
          },
        });

        console.log(response);

        if (response.ok) {
          console.log("Token is valid");
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          console.log("Token is invalid or expired");
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("cathc");
        console.error("Verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyUser();
  }, []);

  // 1. Show a loading state while the API call is in progress
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with a Spinner or Skeleton if preferred
  }

  // 2. If not authenticated, redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 3. If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;