import React, { useEffect, useState } from "react";
import { Bell, Info, Home, Gavel } from "lucide-react";

const defaultNotifications = [
  {
    id: 1,
    title: "New Property Available in Hyderabad",
    description: "A new 2BHK apartment has been listed in Banjara Hills.",
    type: "property",
    date: "2025-08-07",
  },
  {
    id: 2,
    title: "RERA Regulation Update",
    description: "New RERA norms require full project disclosure by builders.",
    type: "law",
    date: "2025-08-06",
  },
  {
    id: 3,
    title: "Maintenance Alert",
    description: "System will be down for maintenance on Aug 9th from 2–4 AM.",
    type: "alert",
    date: "2025-08-05",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "property":
      return <Home className="text-green-600" />;

    default:
      return <Bell className="text-gray-500" />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dashboardProperties");
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch {
        setNotifications(defaultNotifications);
      }
    } else {
      setNotifications(defaultNotifications);
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center">No new notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note, index) => (
              <li
                key={note.id ? `${note.id}-${index}` : index}
                className="flex items-start gap-4 border-b pb-4"
              >
                <div className="pt-1">{getIcon(note.type)}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {note.name}
                  </h4>
                  <p className="text-gray-600">
                    Property for {note.purpose} is available
                  </p>
                  <p className="text-md text-black-400 mt-1">
                    {note.propertyType}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    📅 {note.submittedAt}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notifications;
