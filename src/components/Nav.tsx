import { AppSheet } from "@/components/AppSidebar";
import SignOut from "./SignOut";
import Logo from "./Logo";
import Link from "next/link";
import IfFullScreen from "./IfFullScreen";

function Nav() {
  return (
    <>
      <IfFullScreen>
        <nav className="bg-card h-[65px] sticky top-0 z-50">
          <div className="flex items-center p-3 bg-muted_opacity h-[65px]">
            {/* Bal oldali elem (AppSheet) */}
            <div className="flex-1 flex justify-start">
              <AppSheet />
            </div>

            {/* Középső elem (Dessert) - abszolút pozícionálással */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[3px] mt-1">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            {/* Jobb oldali elem (Gomb) */}
            <div className="flex-1 flex justify-end">
              <SignOut />
            </div>
          </div>
        </nav>
      </IfFullScreen>
    </>
  );
}

export default Nav;
