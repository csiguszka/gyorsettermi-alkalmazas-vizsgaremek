"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drumstick,
  ForkKnife,
  GalleryVerticalEnd,
  Home,
  Menu,
  Package,
  PackagePlus,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";

export function AppSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-screen sm:w-[540px] md:w-[400px]"
      >
        <SheetHeader>
          <div className="flex space-x-4 mb-4">
            <GalleryVerticalEnd />
            <SheetTitle>Menu</SheetTitle>
          </div>
          <Link href={"/"} className="menu" onClick={handleLinkClick}>
            <Home />
            <h2>Főoldal</h2>
          </Link>
          <Link href={"/konyha"} className="menu" onClick={handleLinkClick}>
            <ForkKnife />
            <h2>Konyha kijelző</h2>
          </Link>
          <Link href={"/pult"} className="menu" onClick={handleLinkClick}>
            <Store />
            <h2>Pult kijelző</h2>
          </Link>
          <Link href={"/customer"} className="menu" onClick={handleLinkClick}>
            <User />
            <h2>Vásárló kijelző</h2>
          </Link>
          <Link href={"/etlap"} className="menu" onClick={handleLinkClick}>
            <Drumstick />
            <h2>Étlap</h2>
          </Link>
          <Link href={"/arukeszlet"} className="menu" onClick={handleLinkClick}>
            <Package />
            <h2>Árukészlet</h2>
          </Link>
          <Link
            href={"/aru-feltoltes"}
            className="menu"
            onClick={handleLinkClick}
          >
            <PackagePlus />
            <h2>Áru feltöltés</h2>
          </Link>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
