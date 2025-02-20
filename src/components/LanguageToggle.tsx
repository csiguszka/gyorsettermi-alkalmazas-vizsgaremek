"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { changeLang } from "@/state/lang";

export function LanguageToggle() {
  const lang = useSelector((state: RootState) => state.states.lang.value);
  const dispatch = useDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="btn_outline">
          <Image
            src="/flags/hu.svg"
            alt="Hungarian"
            width={20}
            height={20}
            className={lang !== "hu" ? "hidden" : ""}
          />
          <Image
            src="/flags/en.svg"
            alt="English"
            width={20}
            height={20}
            className={lang !== "en" ? "hidden" : ""}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuItem onClick={() => dispatch(changeLang("hu"))}>
          Magyar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(changeLang("en"))}>
          Angol
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
