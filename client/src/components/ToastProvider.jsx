import { createContext, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function pushToast({ title, description, type = "info", duration = 3000 }) {
    const id = ++idCounter;
    const toast = { id, title, description, type };
    setToasts((t) => [...t, toast]);
    if (duration) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }

  function dismiss(id) {
    setToasts((t) => t.filter((x) => x.id !== id));
  }

  const value = useMemo(() => ({ pushToast, dismiss }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div style={{ position: 'fixed', right: 16, bottom: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 1000 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: '#111827', color: '#fff', borderRadius: 10, padding: '10px 12px', boxShadow: '0 2px 14px rgba(0,0,0,0.2)', minWidth: 260 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.title}</div>
            {t.description && <div style={{ opacity: 0.9 }}>{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
