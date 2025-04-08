"use client";

import { Material } from "@/app/model/material-model";
import DeleteButton from "@/components/DeleteButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import { motion } from "motion/react";

const MotionCard = motion.create(Card);

interface InventoryFormCardProps {
  material: Material;
  handleDelete: (id: string) => void;
  handleModify: (d: Material) => void;
}

function InventoryFormCard({
  material,
  handleDelete,
  handleModify,
}: InventoryFormCardProps) {
  const [unit, setUnit] = useState<string>(material.unit || "");
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>(material.name);
  const [englishName, setEnglishName] = useState<string>(material.englishName);
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsloading] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMaterial: Material = {
      _id: material._id,
      englishName: englishName,
      name: name,
      inStock: stock,
      unit: unit,
    };
    handleModify(newMaterial);
    setIsloading(false);
  };

  return (
    <MotionCard
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      className="card max-w-full lg:w-1/3"
    >
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
            <Label>Angol név</Label>
            <Input
              placeholder="Angol név"
              value={englishName}
              onChange={(e) => setEnglishName(e.target.value)}
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
            <Label>Mennyiség változás{unit ? `(${unit})` : ""}</Label>
            <br />
            <Label>
              Jelenlegi mennyiség: {material.inStock} {unit ? `${unit}` : ""}
            </Label>
            <Input
              type="number"
              placeholder="Pl: 1.5"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
          {error && <p className="text-destructive">{error}</p>}
          <div className="flex flex-row justify-between items-center">
            <Button
              className="btn"
              type="submit"
              onClick={() => setIsloading(true)}
            >
              Mentés {isLoading && <Loading />}
            </Button>
            <DeleteButton onClick={() => handleDelete(material._id!)} />
          </div>
        </form>
      </CardHeader>
    </MotionCard>
  );
}

export default InventoryFormCard;
