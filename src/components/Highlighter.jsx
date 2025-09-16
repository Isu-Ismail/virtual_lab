import React, { useState, useEffect, useCallback } from "react";

function Highlighter({ selector }) {
  const [rect, setRect] = useState(null);

  // useCallback memoizes the function so it doesn't get recreated on every render
  const updatePosition = useCallback(() => {
    if (selector) {
      try {
        const elem = document.querySelector(selector);
        if (elem) {
          setRect(elem.getBoundingClientRect());
        } else {
          setRect(null);
        }
      } catch (e) {
        console.error("Invalid selector for highlighter:", selector);
        setRect(null);
      }
    } else {
      setRect(null);
    }
  }, [selector]);

  useEffect(() => {
    updatePosition(); // Initial position calculation

    // --- ADDED: Event listener for scrolling ---
    window.addEventListener("scroll", updatePosition, true); // Use capture phase for reliability

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [selector, updatePosition]);

  if (!rect) return null;

  return (
    <div
      className="fixed border-4 border-blue-500 rounded-lg pointer-events-none z-40 transition-all duration-100" // Faster transition
      style={{
        left: rect.left - 6,
        top: rect.top - 6,
        width: rect.width + 12,
        height: rect.height + 12,
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.7)",
      }}
    />
  );
}

export default Highlighter;
