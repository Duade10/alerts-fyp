// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Contacts = () => {
//   // Mock saved contacts
//   const [contacts, setContacts] = useState([
//     { id: 1, name: "John Doe", phone: "+1234567890", email: "john.doe@example.com" },
//     { id: 2, name: "Jane Smith", phone: "+0987654321", email: "jane.smith@example.com" },
//   ]);

//   // State for new contact form and edit form
//   const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });
//   const [editContact, setEditContact] = useState<{ id: number; name: string; phone: string; email: string } | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (editContact) {
//       setEditContact((prev) => (prev ? { ...prev, [name]: value } : null));
//     } else {
//       setNewContact((prev) => ({ ...prev, [name]: value }));
//     }
//     setError(null); // Clear error on change
//   };

//   // Handle adding new contact
//   const handleAddContact = () => {
//     if (!newContact.name || !newContact.phone || !newContact.email) {
//       setError("All fields (name, phone, and email) are required.");
//       return;
//     }
//     if (!/^\+\d{10,}$/.test(newContact.phone)) {
//       setError("Please enter a valid phone number (e.g., +1234567890).");
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     setContacts([...contacts, { id: Date.now(), ...newContact }]);
//     setNewContact({ name: "", phone: "", email: "" }); // Reset form
//     setError(null);
//   };

//   // Handle editing a contact
//   const handleEditContact = (contact: { id: number; name: string; phone: string; email: string }) => {
//     setEditContact(contact);
//   };

//   // Handle saving edited contact
//   const handleSaveEdit = () => {
//     if (editContact) {
//       if (!editContact.name || !editContact.phone || !editContact.email) {
//         setError("All fields are required.");
//         return;
//       }
//       if (!/^\+\d{10,}$/.test(editContact.phone)) {
//         setError("Please enter a valid phone number (e.g., +1234567890).");
//         return;
//       }
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editContact.email)) {
//         setError("Please enter a valid email address.");
//         return;
//       }
//       setContacts(contacts.map((c) => (c.id === editContact.id ? editContact : c)));
//       setEditContact(null); // Exit edit mode
//       setError(null);
//     }
//   };

//   // Handle deleting a contact
//   const handleDeleteContact = (id: number) => {
//     if (window.confirm("Are you sure you want to delete this contact?")) {
//       setContacts(contacts.filter((contact) => contact.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
//       <h2 className="text-2xl font-bold mb-6">Contacts</h2>
//       <div className="w-full max-w-md">
//         {/* Saved Contacts */}
//         {contacts.length > 0 ? (
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-4">Saved Contacts</h3>
//             <ul className="space-y-4">
//               {contacts.map((contact) => (
//                 <li
//                   key={contact.id}
//                   className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 flex justify-between items-center"
//                 >
//                   {editContact && editContact.id === contact.id ? (
//                     <div className="w-full space-y-2">
//                       <input
//                         type="text"
//                         name="name"
//                         value={editContact.name}
//                         onChange={handleChange}
//                         className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//                       />
//                       <input
//                         type="text"
//                         name="phone"
//                         value={editContact.phone}
//                         onChange={handleChange}
//                         className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//                       />
//                       <input
//                         type="email"
//                         name="email"
//                         value={editContact.email}
//                         onChange={handleChange}
//                         className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//                       />
//                       <div className="flex space-x-2 mt-2">
//                         <button
//                           onClick={handleSaveEdit}
//                           className="flex-1 p-2 bg-green-600 rounded-full text-sm font-semibold hover:bg-green-700 transition"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={() => setEditContact(null)}
//                           className="flex-1 p-2 bg-gray-500 rounded-full text-sm font-semibold hover:bg-gray-600 transition"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <p className="text-sm font-medium">Name: {contact.name}</p>
//                       <p className="text-sm">Phone: {contact.phone}</p>
//                       <p className="text-sm">Email: {contact.email}</p>
//                     </div>
//                   )}
//                   {!editContact || editContact.id !== contact.id ? (
//                     <div className="space-x-2">
//                       <button
//                         onClick={() => handleEditContact(contact)}
//                         className="p-2 bg-blue-600 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteContact(contact.id)}
//                         className="p-2 bg-red-600 rounded-full text-sm font-semibold hover:bg-red-700 transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ) : null}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ) : (
//           <p className="text-gray-400 mb-6">No contacts saved yet.</p>
//         )}

//         {/* Add New Contact Form */}
//         <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
//           <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={newContact.name}
//               onChange={handleChange}
//               placeholder="Name"
//               className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//             />
//             <input
//               type="text"
//               name="phone"
//               value={newContact.phone}
//               onChange={handleChange}
//               placeholder="Phone (e.g., +1234567890)"
//               className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//             />
//             <input
//               type="email"
//               name="email"
//               value={newContact.email}
//               onChange={handleChange}
//               placeholder="Email (e.g., name@example.com)"
//               className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//             />
//             {error && <p className="text-red-400 text-sm">{error}</p>}
//             <button
//               onClick={handleAddContact}
//               className="w-full mt-2 p-2 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
//             >
//               Add Contact
//             </button>
//           </div>
//         </div>
//       </div>
//       <Link
//         to="/menu"
//         className="mt-6 w-40 h-12 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition flex items-center justify-center"
//       >
//         Back to Menu
//       </Link>
//     </div>
//   );
// };

// export default Contacts;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // 👈 for API calls

const Contacts = () => {
  const [contacts, setContacts] = useState<
    { id: number; name: string; phone: string; email: string }[]
  >([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "" });
  const [editContact, setEditContact] = useState<{ id: number; name: string; phone: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load contacts from API when page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/api/contacts/",{
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editContact) {
      setEditContact((prev) => (prev ? { ...prev, [name]: value } : null));
    } else {
      setNewContact((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  // Handle adding new contact
  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone || !newContact.email) {
      setError("All fields (name, phone, and email) are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8000/api/contacts/",
        newContact,
      { headers: { Authorization: `Token ${token}` } } 
      );
      setContacts([...contacts, res.data]); // 👈 append new contact from backend
      setNewContact({ name: "", phone: "", email: "" });
    } catch (err) {
      console.error("Error adding contact:", err);
      setError("Failed to add contact.");
    }
  };

  // Handle saving edited contact
  const handleSaveEdit = async () => {
    if (editContact) {
      try {
        const token = localStorage.getItem("token"); // 👈 get token
        const res = await axios.put(
          `http://localhost:8000/api/contacts/${editContact.id}/`,
          editContact,
            { headers: { Authorization: `Token ${token}` } }
        );
        setContacts(contacts.map((c) => (c.id === editContact.id ? res.data : c)));
        setEditContact(null);
      } catch (err) {
        console.error("Error updating contact:", err);
        setError("Failed to update contact.");
      }
    }
  };

  // Handle deleting a contact
  const handleDeleteContact = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:8000/api/contacts/${id}/`,
           {headers: { Authorization: `Token ${token}` }, 
      });
        setContacts(contacts.filter((contact) => contact.id !== id));
      } catch (err) {
        console.error("Error deleting contact:", err);
        setError("Failed to delete contact.");
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Contacts</h2>
      <div className="w-full max-w-md">
        {/* Saved Contacts */}
        {contacts.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Saved Contacts</h3>
            <ul className="space-y-4">
              {contacts.map((contact) => (
                <li
                  key={contact.id}
                  className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 flex justify-between items-center"
                >
                  {editContact && editContact.id === contact.id ? (
                    <div className="w-full space-y-2">
                      <input
                        type="text"
                        name="name"
                        value={editContact.name}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={editContact.phone}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                      <input
                        type="email"
                        name="email"
                        value={editContact.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={handleSaveEdit}
                          className="flex-1 p-2 bg-green-600 rounded-full text-sm font-semibold hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditContact(null)}
                          className="flex-1 p-2 bg-gray-500 rounded-full text-sm font-semibold hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium">Name: {contact.name}</p>
                      <p className="text-sm">Phone: {contact.phone}</p>
                      <p className="text-sm">Email: {contact.email}</p>
                    </div>
                  )}
                  {!editContact || editContact.id !== contact.id ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditContact(contact)}
                        className="p-2 bg-blue-600 rounded-full text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="p-2 bg-red-600 rounded-full text-sm font-semibold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400 mb-6">No contacts saved yet.</p>
        )}

        {/* Add New Contact Form */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Add New Contact</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={newContact.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            <input
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleChange}
              placeholder="Phone (e.g., +1234567890)"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            <input
              type="email"
              name="email"
              value={newContact.email}
              onChange={handleChange}
              placeholder="Email (e.g., name@example.com)"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              onClick={handleAddContact}
              className="w-full mt-2 p-2 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
            >
              Add Contact
            </button>
          </div>
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

export default Contacts;
