import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { AuthProvider } from '@/context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

// Safe localStorage wrapper for search crawlers/sandboxes where localStorage might throw SecurityError or be disabled
try {
  const testKey = '__storage_test__';
  window.localStorage.setItem(testKey, testKey);
  window.localStorage.removeItem(testKey);
} catch (e) {
  const memoryStorage = {};
  const mockStorage = {
    getItem: (key) => memoryStorage[key] || null,
    setItem: (key, value) => { memoryStorage[key] = String(value); },
    removeItem: (key) => { delete memoryStorage[key]; },
    clear: () => { for (const key in memoryStorage) delete memoryStorage[key]; },
    key: (index) => Object.keys(memoryStorage)[index] || null,
    get length() { return Object.keys(memoryStorage).length; }
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true
  });
}

const container = document.getElementById('root');
const app = (
  <AuthProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </AuthProvider>
);

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}