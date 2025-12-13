import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsTracker = () => {
  const location = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double-logging in React Strict Mode (Development)
    if (initialized.current) return;
    initialized.current = true;

    const logVisit = async () => {
      // Check if we already logged this session to avoid counting refresh as new visit
      // (Simple session storage check)
      const sessionKey = `visited-${new Date().toDateString()}`;
      if (sessionStorage.getItem(sessionKey)) return;

      try {
        await fetch(`${import.meta.env.VITE_PAYLOAD_URL}/api/page-views`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
          }),
        });
        sessionStorage.setItem(sessionKey, "true");
      } catch (err) {
        console.error("Analytics Error", err);
      }
    };

    logVisit();
  }, [location]); // Re-run if they change pages (optional, remove [location] to track unique daily visits only)

  return null; // This component renders nothing
};

export default AnalyticsTracker;
