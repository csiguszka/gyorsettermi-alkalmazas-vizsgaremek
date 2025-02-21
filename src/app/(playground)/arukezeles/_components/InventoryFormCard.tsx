"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useState } from "react";
function handleSubmit() {}

function InventoryFormCard() {
  const [unit, setUnit] = useState("");
  return (
    <Card className="card max-w-full lg:w-1/3">
      <CardHeader>
        <h2 className="text-center">Sajt</h2>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div>
            <Label>Név</Label>
            <Input placeholder="Név" />
          </div>
          <div>
            <Label>Mértékegység</Label>
            <Input
              placeholder="Mértékegység"
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>
          <div>
            <Label>Mennyiség {unit ? `(${unit})` : ""}</Label>
            <Input type="number" placeholder="Pl: 1.5" />
          </div>
          <div className="flex flex-row justify-between">
            <Button className="btn" type="submit">
              Mentés
            </Button>
            <Trash2 className="text-destructive" />
          </div>
        </form>
      </CardHeader>
    </Card>
  );
}
export default InventoryFormCard;
