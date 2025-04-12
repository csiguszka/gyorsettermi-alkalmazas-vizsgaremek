"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import ENDPOINTURL from "@/app/url";
import { PaginationResponse } from "@/app/model/pagination-model";
import { Material } from "@/app/model/material-model";

export function MaterialCombobox({
  onMaterialSelect,
}: {
  onMaterialSelect: (material: Material) => void;
}) {
  const { token } = useSelector((state: RootState) => state.states.user.value);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: materialList } = useQuery({
    queryKey: ["FoodMaterial"],
    queryFn: () => getMaterials(token),
    staleTime: Infinity,
    enabled: !!token,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? materialList?.find((item) => item.name === value)?.name
            : "Válassz alapanyagot..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Alapanyag keresése..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nem találtunk ilyen alapanyagot.</CommandEmpty>
            <CommandGroup>
              {materialList?.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={(currentValue) => {
                    const selectedMaterial = materialList.find(
                      (material) => material.name === currentValue
                    );
                    if (selectedMaterial) {
                      onMaterialSelect(selectedMaterial); // Hívjuk meg a propot
                      setValue(currentValue);
                    }
                    setOpen(false);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

async function getMaterials(token: string | null): Promise<Material[]> {
  if (!token) {
    window.location.href = "/login";
    return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
  }

  let page = 1;
  let allMaterials: Material[] = [];
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await fetch(
        `${ENDPOINTURL}/material?page=${page}&&limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Accept-Language": "hu",
          },
        }
      );

      const data: PaginationResponse<Material[]> = await response.json();

      if (data.items.length === 0) {
        break; // Ha nincs több találat, kilépünk a ciklusból
      }

      allMaterials = [...allMaterials, ...data.items];

      if (page >= data.pageCount) {
        hasMore = false; // Ha az utolsó oldalon vagyunk, befejezzük a kéréseket
      } else {
        page++; // Kérjük a következő oldalt
      }
    }

    return allMaterials;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Hiba történt: ${error.message}`
        : "Ismeretlen hiba történt"
    );
  }
}
