import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // Mock sign-up details (simulating data from backend)
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "User Name",
    email: "user@example.com",
    phone: "+1234567890",
  });

  // Handle form changes during edit mode
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (mock for now)
  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved! (Mock implementation)");
    // In a real app, send to backend via API (e.g., PUT /user/profile)
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 space-y-6">
        {/* User Profile Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={userProfile.name}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={userProfile.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
                <input
                  type="text"
                  name="phone"
                  value={userProfile.phone}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                />
              </>
            ) : (
              <>
                <p className="text-sm">Name: {userProfile.name}</p>
                <p className="text-sm">Email: {userProfile.email}</p>
                <p className="text-sm">Phone: {userProfile.phone}</p>
              </>
            )}
          </div>
        </div>

        {/* Edit/Save Controls */}
        <div>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full p-2 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full p-2 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <Link
        to="/menu"
        className="mt-6 w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default Profile;