import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <Link to="/" className="w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center mb-4">
        Home
      </Link>
      <Link to="/notifications" className="w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center mb-4">
        Notifications
      </Link>
      <Link to="/profile" className="w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center mb-4">
        Profile
      </Link>
      <Link to="/help" className="w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center mb-4">
        Help
      </Link>
      <Link to="/contacts" className="w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center">
        Contacts
      </Link>
    </div>
  );
};

export default Menu;