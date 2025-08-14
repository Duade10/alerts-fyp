import { useParams, Link } from "react-router-dom";

const NotificationDetails = () => {
  // Get notification ID from URL params
  const { id } = useParams<{ id: string }>();

  // Mock notification data
  const notifications = [
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

  // Find the specific notification
  const notification = notifications.find((n) => n.id === Number(id));

  if (!notification) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex items-center justify-center">
        <p className="text-gray-400">Notification not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Notification Details</h2>
      <div className="w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <p className="text-sm font-medium">Type: {notification.type}</p>
        <p className="text-sm">Time: {notification.timestamp}</p>
        <p className="text-sm">Status: {notification.status}</p>
        <h3 className="text-md font-semibold mt-4">Details:</h3>
        <p className="text-sm">Location: {notification.details.location}</p>
        <p className="text-sm">Caregiver Response: {notification.details.caregiverResponse}</p>
        <p className="text-sm">Message: {notification.details.message}</p>
      </div>
      <Link
        to="/notifications"
        className="mt-6 w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center"
      >
        Back
      </Link>
    </div>
  );
};

export default NotificationDetails;