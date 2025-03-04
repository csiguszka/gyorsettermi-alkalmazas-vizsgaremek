"use client";

import { Material } from "@/app/model/material-model";
import DeleteButton from "@/components/DeleteButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useEffect, useState } from "react";

interface InventoryFormCardProps {
  material: Material;
  handleDelete?: () => void;
  handleSubmit: (d: Material) => void;
}

function InventoryFormCard({
  material,
  handleSubmit,
  handleDelete,
}: InventoryFormCardProps) {
  useEffect(() => {
    setUnit(material.unit);
    setError("");
    setName(material.name);
    setStock(material.inStock);
    setIsloading(false);
  }, [material]);

  const [unit, setUnit] = useState<string>(material.unit || "");
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>(material.name);
  const [stock, setStock] = useState<number>(material.inStock);
  const [isLoading, setIsloading] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMaterial: Material = {
      _id: material._id,
      englishName: name,
      name: name,
      inStock: stock,
      unit: unit,
    };
    handleSubmit(newMaterial);
    setIsloading(false);
  };

  return (
    <Card className="card max-w-full lg:w-1/3">
      <CardHeader>
        <h2 className="text-center">
          {material.name ? material.name : "Új alapanyag"}
        </h2>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <div>
            <Label>Név</Label>
            <Input
              placeholder="Név"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label>Mértékegység</Label>
            <Input
              placeholder="Mértékegység"
              value={unit}
              onChange={(e) => {
                setError("");
                setUnit(e.target.value);
              }}
            />
          </div>
          <div>
            <Label>Mennyiség {unit ? `(${unit})` : ""}</Label>
            <Input
              type="number"
              placeholder="Pl: 1.5"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
          {error && <p className="text-destructive">{error}</p>}
          <div className="flex flex-row justify-between">
            <Button
              className="btn"
              type="submit"
              onClick={() => setIsloading(true)}
            >
              Mentés {isLoading && <Loading />}
            </Button>
            {handleDelete && <DeleteButton onClick={handleDelete} />}
          </div>
        </form>
      </CardHeader>
    </Card>
  );
}

export default InventoryFormCard;
