"use client";

import { useEffect, useState } from "react";
import { AppSheet } from "@/components/AppSidebar";
import SignOut from "./SignOut";
import Logo from "./Logo";
import Link from "next/link";

function Nav() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <>
      {!isFullscreen && (
        <nav className="flex items-center p-3">
          {/* Bal oldali elem (AppSheet) */}
          <div className="flex-1 flex justify-start">
            <AppSheet />
          </div>

          {/* Középső elem (Dessert) - abszolút pozícionálással */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[3px]">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Jobb oldali elem (Gomb) */}
          <div className="flex-1 flex justify-end">
            <SignOut />
          </div>
        </nav>
      )}
    </>
  );
}

export default Nav;
