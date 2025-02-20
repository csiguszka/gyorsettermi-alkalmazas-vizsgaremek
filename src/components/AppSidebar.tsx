"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drumstick,
  ForkKnife,
  Home,
  Menu,
  Package,
  PackagePlus,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";
import { ModeToggle } from "./ModeToggle";

export function AppSheet() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="text-primary" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col gap-2 w-screen sm:w-[250px] bg-card dark:bg-muted border-none"
      >
        <section className="flex justify-between items-center mt-3">
          <SheetTitle className="text-xl">Menü</SheetTitle>
          <section className="flex gap-2">
            <LanguageToggle />
            <ModeToggle />
          </section>
        </section>
        <Link href={"/"} className="menu" onClick={handleLinkClick}>
          <Home />
          <h3>Főoldal</h3>
        </Link>
        <Link href={"/konyha"} className="menu" onClick={handleLinkClick}>
          <ForkKnife />
          <h3>Konyha kijelző</h3>
        </Link>
        <Link href={"/pult"} className="menu" onClick={handleLinkClick}>
          <Store />
          <h3>Pult kijelző</h3>
        </Link>
        <Link href={"/customer"} className="menu" onClick={handleLinkClick}>
          <User />
          <h3>Vásárló kijelző</h3>
        </Link>
        <Link href={"/etlap"} className="menu" onClick={handleLinkClick}>
          <Drumstick />
          <h3>Étlap</h3>
        </Link>
        <Link href={"/arukeszlet"} className="menu" onClick={handleLinkClick}>
          <Package />
          <h3>Árukészlet</h3>
        </Link>
        <Link
          href={"/aru-feltoltes"}
          className="menu"
          onClick={handleLinkClick}
        >
          <PackagePlus />
          <h3>Áru feltöltés</h3>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
