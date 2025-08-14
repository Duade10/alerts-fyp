import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Help & Instructions</h2>
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 space-y-4">
        <h3 className="text-lg font-semibold">How to Use Med Alert</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            Press the <strong>SOS</strong> button in an emergency to send your location to
            caregivers.
          </li>
          <li>Ensure location services are enabled for accurate alerts.</li>
          <li>Check notifications for updates from caregivers.</li>
          <li>Update your contacts and settings as needed.</li>
        </ul>
        <h3 className="text-lg font-semibold mt-4">Troubleshooting</h3>
        <p>
          If the SOS button doesn’t work, verify your internet connection and location
          permissions.
        </p>
        
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

export default Help;