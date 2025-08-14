import { Link } from "react-router-dom";

const Notifications = () => {
  // Mock notification data
  const notifications = [
    // New Notifications
    {
      id: 1,
      timestamp: "2025-07-06 15:00",
      type: "Emergency Alert",
      status: "New",
      details: {
        location: "Lat: 6.5244, Lng: 3.3792",
        caregiverResponse: "Pending",
        message: "Alert triggered at home.",
      },
    },
    {
      id: 2,
      timestamp: "2025-07-06 14:30",
      type: "Test Alert",
      status: "New",
      details: {
        location: "Lat: 6.5245, Lng: 3.3793",
        caregiverResponse: "Pending",
        message: "Test alert from office.",
      },
    },
    // Old Notifications
    {
      id: 3,
      timestamp: "2025-07-05 09:30",
      type: "Emergency Alert",
      status: "Old",
      details: {
        location: "Lat: 6.5246, Lng: 3.3794",
        caregiverResponse: "Acknowledged by John",
        message: "Alert resolved.",
      },
    },
    {
      id: 4,
      timestamp: "2025-07-04 15:45",
      type: "Emergency Alert",
      status: "Old",
      details: {
        location: "Lat: 6.5247, Lng: 3.3795",
        caregiverResponse: "No response",
        message: "Alert from park.",
      },
    },
  ];

  // Separate new and old notifications
  const newNotifications = notifications.filter((n) => n.status === "New");
  const oldNotifications = notifications.filter((n) => n.status === "Old");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {/* New Notifications Section */}
      {newNotifications.length > 0 && (
        <div className="w-full max-w-md mb-6">
          <h3 className="text-lg font-semibold mb-4">New Notifications</h3>
          <ul className="space-y-4">
            {newNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md border border-yellow-500"
              >
                <p className="text-sm font-medium">Type: {notification.type}</p>
                <p className="text-sm">Time: {notification.timestamp}</p>
                <Link
                  to={`/notification/${notification.id}`}
                  className="mt-2 text-blue-400 text-sm hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Old Notifications Section */}
      {oldNotifications.length > 0 && (
        <div className="w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Old Notifications</h3>
          <ul className="space-y-4">
            {oldNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
              >
                <p className="text-sm font-medium">Type: {notification.type}</p>
                <p className="text-sm">Time: {notification.timestamp}</p>
                <Link
                  to={`/notification/${notification.id}`}
                  className="mt-2 text-blue-400 text-sm hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Notifications Message */}
      {newNotifications.length === 0 && oldNotifications.length === 0 && (
        <p className="text-gray-400">No notifications yet.</p>
      )}

      <Link
        to="/menu"
        className="mt-6 w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default Notifications;