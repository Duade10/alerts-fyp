import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "../api/axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => setError(err.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSOS = async () => {
    if (!location) {
      setError("Location not available. Please enable location.");
      return;
    }
    if (window.confirm("Are you sure you want to send an emergency alert?")) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.post("http://127.0.0.1:8000/api/alerts/", {
          userId: "user123",
          title: "Emergencyyy",
          message: "This is an emergency, pls help!",
          latitude: location.lat,
          longitude: location.lng,
        },
      {
        headers: {
          Authorization: `Token ${token}`,  // 👈 Token, not Bearer
          "Content-Type": "application/json",
        }
      }
    );
        if (response.status === 200) {
          alert("Emergency alert sent successfully!");
        }
      } catch (error) {
        setError("Failed to send alert. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-64px)]">
      <button
        onClick={handleSOS}
        disabled={loading || !location}
        className="relative w-64 h-64 rounded-full bg-red-600 ring-4 ring-gray-700 flex items-center justify-center text-5xl font-bold shadow-lg transition
          disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700"
      >
        <span>SOS</span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-red-600/50 rounded-full">
            Sending...
          </span>
        )}
      </button>
      <p className="mt-6 text-center text-lg font-medium">
        PRESS THE BUTTON IN CASE OF EMERGENCY
      </p>
      {error && <p className="mt-4 text-red-300 text-sm text-center">{error}</p>}
      <Link to="/menu" className="mt-10 w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center">
        MENU
      </Link>
    </div>
  );
};

export default Home;