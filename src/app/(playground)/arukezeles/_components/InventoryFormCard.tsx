"use client";

import { Material } from "@/app/model/material-model";
import DeleteButton from "@/components/DeleteButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface InventoryFormCardProps {
  material: Material;
  successHandle: (d: Material) => void;
  failedHandle: () => void;
  handleSubmit: (
    d: Material,
    token: string,
    successFunction: (d: Material) => void,
    failedModify: () => void
  ) => void;
  handleDelete?: () => void;
}

function InventoryFormCard({
  material,
  handleSubmit,
  successHandle,
  failedHandle,
  handleDelete,
}: InventoryFormCardProps) {
  const token = useSelector(
    (state: RootState) => state.states.user.value.token
  );

  useEffect(() => {
    setUnit(material.unit || "");
    setStock(material.inStock);
    setName(material._id);
  }, [material]);

  const [unit, setUnit] = useState<string>(material.unit || "");
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>(material._id);
  const [stock, setStock] = useState<number>(material.inStock);
  const [isLoading, setIsloading] = useState(false);

  return (
    <Card className="card max-w-full lg:w-1/3">
      <CardHeader>
        <h2 className="text-center">
          {material._id ? material._id : "Új alapanyag"}
        </h2>
        <form
          className="flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (unit === "") {
              setError("A mértékegység megadása kötelező!")
              setIsloading(false)
              return
            }
            if (material.unit === unit) {
              setUnit("")
            }
            handleSubmit(
              {
                _id: name,
                inStock: stock,
                unit,
                quantity: stock - material.inStock,
              },
              token!,
              successHandle,
              failedHandle
            );
            setIsloading(false);
          }}
        >
          {material._id === "" && (
            <div>
              <Label>Név</Label>
              <Input
                placeholder="Név"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <Label>Mértékegység</Label>
            <Input
              placeholder="Mértékegység"
              value={unit}
              onChange={(e) => {setError(""); setUnit(e.target.value); }}
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
          {
           error && <p className="text-destructive">{error}</p>
          }
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
