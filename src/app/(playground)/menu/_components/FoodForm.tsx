import ENDPOINTURL from "@/app/url";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { CardHeader, Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/state/store";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { Food, FoodMaterial } from "@/app/model/food-model";
import { MaterialCombobox } from "@/components/MaterialCombobox";
import { Material } from "@/app/model/material-model";
import { Category } from "@/app/model/category-model";

const MotionCard = motion.create(Card);

function FoodForm({ food, mainCategory, subCategory }: { food?: Food, mainCategory: Category, subCategory: Category }) {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>(food?.name || "");
  const [englishName, setEnglishName] = useState<string>(food?.englishName || "");
  const [price, setPrice] = useState<number>(food?.price || 0);
  const [materials, setMaterials] = useState<FoodMaterial[]>(food?.materials || []);
  const [isEnabled, setIsEnabled] = useState<boolean>(food?.isEnabled ?? true);
  const [image, setImage] = useState<string>(food?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const handleAddMaterial = (material: Material) => {
    // Ellenőrizzük, hogy az alapanyag már szerepel-e
    if (materials.some((m) => m.materialId === material._id)) {
      toast({ title: "Ez az alapanyag már hozzá lett adva.", variant: "destructive" });
      return;
    }

    // Hozzáadjuk az új alapanyagot alapértelmezett mennyiséggel (pl. 1)
    setMaterials((prev) => [...prev, { materialId: material._id as string, quantity: 1, name: material.name }]);

  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !englishName) {
      setError("A név és angol név mezőt kötelező kitölteni.");
      return;
    }

    setIsLoading(true);

    const newFood: Food = {
      _id: food?._id || "",
      englishName,
      name,
      price,
      materials: materials.map((material) => { return {materialId: material.materialId, quantity: material.quantity}}),
      categoryId: mainCategory._id,
      subCategoryId: [subCategory._id],
      isEnabled,
      image,
    };

    try {
      const response = food?._id
        ? await handleModify(newFood, token)
        : await handleCreate(newFood, token);

      if (response?.status === 200) {
        toast({
          title: food?._id ? "Az étel módosítása sikeres" : "Az étel sikeresen létrehozva",
        });
        queryClient.invalidateQueries({ queryKey: ["Foods"] });
      } else {
        toast({
          title: food?._id ? "Az étel módosítása sikertelen" : "Az étel létrehozása sikertelen",
          variant: "destructive",
        });
      }
    } catch (err) {
        console.log(err)
      toast({ title: "Hiba történt", variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <MotionCard
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      className="card max-w-full lg:w-1/3"
    >
      <CardHeader>
        <h2 className="text-center">{food ? "Étel módosítása" : "Új étel létrehozása"}</h2>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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
              <Label>Ár</Label>
              <Input
                type="number"
                placeholder="Ár"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Alapanyagok</Label>
              <div className="mb-2">
                <MaterialCombobox onMaterialSelect={handleAddMaterial} />
              </div>
              <div className="flex flex-col gap-2">
              {materials.map((material, index) => {
               return <div key={index} className="flex items-center gap-2">
                    <Label>{material?.name}</Label>
                  <Input
                    type="number"
                    placeholder="Mennyiség"
                    value={material.quantity}
                    onChange={(e) =>
                      setMaterials((prev) =>
                        prev.map((m, i) =>
                          i === index ? { ...m, quantity: Number(e.target.value) } : m
                        )
                      )
                    }
                  />
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setMaterials((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    Törlés
                  </Button>
                </div>
              })}
              </div>
            </div>
            <div>
              <Label>Kategória</Label>
              <p>{mainCategory.name}</p>
            </div>
            <div>
              <Label>Alkategória</Label>
              <p>{subCategory.name}</p>
            </div>
            <div>
              <Label>Kép URL</Label>
              <Input
                placeholder="Kép URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isEnabled}
                onChange={(e) => setIsEnabled(e.target.checked)}
              />
              <Label>Elérhető</Label>
            </div>

            {error && <p className="text-destructive">{error}</p>}
            <Button type="submit" disabled={isLoading}>
              Mentés {isLoading && <Loading />}
            </Button>
          </form>
        </CardContent>
      </CardHeader>
    </MotionCard>
  );
}

export default FoodForm;

async function handleCreate(food: Food, token: string | null) {
  if (!token) {
    window.location.href = "/login";
    return;
  }
  console.log(food)
  const response = await fetch(`${ENDPOINTURL}/food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(food),
  });
  return response;
}

async function handleModify(food: Food, token: string | null) {
  if (!token) {
    window.location.href = "/login";
    return;
  }
  const response = await fetch(`${ENDPOINTURL}/food/${food._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(food),
  });
  return response;
}
