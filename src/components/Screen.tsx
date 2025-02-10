"use client";

import { Maximize, Minimize } from "lucide-react";
import { useState } from "react";

function Screen({ children }: { children: React.ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  return (
    <div className="flex-col gap-3">
      <div className="flex justify-end">
        <div onClick={toggleFullscreen} className="cursor-pointer">
          {isFullscreen ? (
            <Minimize className="m-3" />
          ) : (
            <Maximize className="m-3" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
export default Screen;
