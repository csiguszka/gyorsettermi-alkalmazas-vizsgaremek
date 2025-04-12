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
import { Food } from "@/app/model/food-model";
import { MaterialCombobox } from "@/components/MaterialCombobox";
import { Material } from "@/app/model/material-model";
import { Category } from "@/app/model/category-model";
import ImageUploader from "./ImageUploader";
import { Trash2 } from "lucide-react";

const MotionCard = motion.create(Card);

function FoodForm({
  food,
  mainCategory,
  subCategory,
}: {
  food?: Food;
  mainCategory: Category;
  subCategory: Category;
}) {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    name: food?.name || "",
    englishName: food?.englishName || "",
    price: food?.price || 0,
    materials: food?.materials || [],
    isEnabled: food?.isEnabled ?? true,
    image: food?.image || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleAddMaterial = (material: Material) => {
    // Ellenőrizzük, hogy az alapanyag már szerepel-e
    if (formData.materials.some((m) => m._id === material._id)) {
      toast({
        title: "Ez az alapanyag már hozzá lett adva.",
        variant: "destructive",
      });
      return;
    }

    // Hozzáadjuk az új alapanyagot alapértelmezett mennyiséggel (pl. 1)
    setFormData((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        { _id: material._id as string, quantity: 1, name: material.name },
      ],
    }));
  };

  const handleMaterialChange = (index: number, quantity: number) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index].quantity = quantity;
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));
  };

  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = formData.materials.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, materials: updatedMaterials }));
  };

  const handleImageUrlChange = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "price" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.englishName) {
      setError("A név és angol név mezőt kötelező kitölteni.");
      return;
    }

    setIsLoading(true);

    const newFood: Food = {
      _id: food?._id || "",
      englishName: formData.englishName,
      name: formData.name,
      price: formData.price,
      materials: formData.materials.map(({ _id, quantity }) => ({
        _id,
        quantity,
      })),
      categoryId: mainCategory._id,
      subCategoryId: [subCategory._id],
      isEnabled: formData.isEnabled,
      image: formData.image,
    };

    try {
      const response = food?._id
        ? await handleModify(newFood, token)
        : await handleCreate(newFood, token);

      if (response?.status === 200) {
        toast({
          title: food?._id
            ? "Az étel módosítása sikeres"
            : "Az étel sikeresen létrehozva",
        });
        queryClient.invalidateQueries({ queryKey: ["Foods"] });
      } else {
        toast({
          title: food?._id
            ? "Az étel módosítása sikertelen"
            : "Az étel létrehozása sikertelen",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
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
        <h2 className="text-center">
          {food ? "Étel módosítása" : "Új étel létrehozása"}
        </h2>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            {renderCategorySection(mainCategory, subCategory)}
            {renderInputField("Név", "name", formData.name)}
            {renderInputField("Angol név", "englishName", formData.englishName)}
            {renderInputField("Ár", "price", formData.price, "number")}
            <ImageUploader
              key={formData.image}
              imageUrl={formData.image}
              handleImageUrlChange={handleImageUrlChange}
            />
            {renderMaterialsSection()}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isEnabled}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isEnabled: e.target.checked,
                  }))
                }
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

  function renderInputField(
    label: string,
    field: string,
    value: string | number,
    type = "text"
  ) {
    return (
      <div>
        <Label>{label}</Label>
        <Input
          type={type}
          placeholder={label}
          value={value}
          onChange={(e) => handleInputChange(e, field)}
        />
      </div>
    );
  }

  function renderMaterialsSection() {
    return (
      <div>
        <div className="flex items-center gap-5 mb-2">
          <Label>Alapanyagok:</Label>
          <MaterialCombobox onMaterialSelect={handleAddMaterial} />
        </div>
        <div className="ml-8 flex flex-col gap-2">
          {formData.materials.map((material, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <Label className="font-bold">{material.name}</Label>
                <Trash2
                  className="text-destructive cursor-pointer"
                  onClick={() => handleRemoveMaterial(index)}
                ></Trash2>
              </div>
              <Input
                type="number"
                placeholder="Mennyiség"
                value={material.quantity}
                onChange={(e) =>
                  handleMaterialChange(index, Number(e.target.value))
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderCategorySection(
    mainCategory: Category,
    subCategory: Category
  ) {
    return (
      <div className="flex justify-between">
        <div>
          <Label>Kategória</Label>
          <p>{mainCategory.name}</p>
        </div>
        <div>
          <Label>Alkategória</Label>
          <p>{subCategory.name}</p>
        </div>
      </div>
    );
  }
}

async function handleCreate(food: Food, token: string | null) {
  if (!token) {
    window.location.href = "/login";
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredFood } = food;

  const response = await fetch(`${ENDPOINTURL}/food`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(filteredFood),
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

export default FoodForm;
