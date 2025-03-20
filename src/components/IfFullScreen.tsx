"use client";

import React, { useState, useEffect } from "react";

function IfFullScreen({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkFullscreen = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "F11") {
        event.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen().catch(console.error);
        }
      }
    };

    checkFullscreen();
    document.addEventListener("fullscreenchange", checkFullscreen);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", checkFullscreen);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return isFullscreen ? null : <React.Fragment>{children}</React.Fragment>;
}

export default IfFullScreen;
