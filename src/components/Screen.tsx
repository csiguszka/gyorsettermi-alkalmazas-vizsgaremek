"use client";

import { Maximize } from "lucide-react";
import IfFullScreen from "./IfFullScreen";

function Screen({ children }: { children: React.ReactNode }) {
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    }
  };
  return (
    <div className="flex-col gap-3">
      <div className="flex justify-end">
        <div
          onClick={toggleFullscreen}
          className="cursor-pointer hidden sm:block"
        >
          <IfFullScreen>
            <Maximize className="m-3" />
          </IfFullScreen>
        </div>
      </div>
      {children}
    </div>
  );
}
export default Screen;
