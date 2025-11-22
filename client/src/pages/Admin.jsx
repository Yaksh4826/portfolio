import { useEffect, useMemo, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { apiDelete, apiGet } from "../lib/api.js";
import { useToast } from "../components/ToastProvider.jsx";

export default function Admin() {
  const { isAuthed, isAdmin, user } = useAuth();
  const { pushToast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!isAdmin) return;
      setLoading(true);
      setError(null);
      try {
        const data = await apiGet("/contacts");
        setContacts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isAdmin]);

  async function onDeleteContact(id) {
    if (!confirm("Delete this contact message?")) return;
    try {
      await apiDelete(`/contacts/${id}`);
      setContacts(prev => prev.filter(c => c._id !== id));
      pushToast({ title: "Contact deleted" });
    } catch (e) {
      pushToast({ title: "Delete failed", description: e.message });
    }
  }

  const contactList = useMemo(() => {
    if (loading) return <p>Loading contacts…</p>;
    if (error) return <p style={{ color: "#ff6b6b" }}>{error}</p>;
    if (!contacts.length) return <p>No contact messages yet.</p>;
    return (
      <div className="grid">
        {contacts.map((c) => (
          <div className="card" key={c._id}>
            <h3 className="mb-8">{c.firstname} {c.lastname}</h3>
            <p className="mb-4" style={{ opacity: 0.8 }}>{c.email}{c.contactNumber ? ` · ${c.contactNumber}` : ""}</p>
            <p className="mb-12">{c.message}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn" onClick={() => onDeleteContact(c._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }, [contacts, loading, error]);

  if (!isAuthed) return <Navigate to="/signin" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="page">
      <div className="container">
        <h1>Admin</h1>
        <p className="mb-12">Manage your portfolio content and view contact messages.</p>

        <div className="grid" style={{ marginBottom: 24 }}>
          <div className="card">
            <h3 className="mb-8">Profile</h3>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
          <div className="card">
            <h3 className="mb-8">Quick Links</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link className="btn" to="/projects">Manage Projects</Link>
              <Link className="btn" to="/education">Manage Education</Link>
              <Link className="btn" to="/services">Manage Services</Link>
              <Link className="btn" to="/about">Manage About</Link>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-12">Contact Messages</h3>
          {contactList}
        </div>
      </div>
    </div>
  );
}


