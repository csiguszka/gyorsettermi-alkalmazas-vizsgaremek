import { Category } from "@/app/model/category-model";
import ENDPOINTURL from "@/app/url";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/state/store";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

function NewSubCategoryForm() {
    const {token} = useSelector((state: RootState) => state.states.user.value)
      const [error, setError] = useState<string>("");
      const [name, setName] = useState<string>("");
      const [englishName, setEnglishName] = useState<string>("");
      const [isLoading, setIsloading] = useState(false);
          const queryClient = useQueryClient();
      
    const {toast} = useToast()
      const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!name || !englishName) {
              setError("A név és angol név mezőt kötelező kitölteni.")
              return
          }
        const newSubCategory: Category = {
            _id: "",
          englishName: englishName,
          icon: "",
          name: name,
          isMainCategory: false
        };
        const response = await handleCreate(newSubCategory, token);
        if (response?.status === 200) {
            toast({title: "Az alkategória sikeresen létrehozva"})
            queryClient.invalidateQueries({ queryKey: ["subCategories"] });

        }else{
            toast({title: "Az alkategória létrehozása sikertelen", variant: "destructive"})
        }
        setIsloading(false);
      };
  return (
    <CardHeader>
    <h2 className="text-center">
      Új alapanyag
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
      {error && <p className="text-destructive">{error}</p>}
      <div className="flex flex-row justify-between">
        <Button
          className="btn"
          type="submit"
          onClick={() => setIsloading(true)}
        >
          Mentés {isLoading && <Loading />}
        </Button>
      </div>
    </form>
  </CardHeader>
  )
}
export default NewSubCategoryForm


const handleCreate = async (category: Category, token: string | null) => {
    if (!token) {
        window.location.href = "/login";
        return;
      }
  
    const response = await fetch(`${ENDPOINTURL}/category`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: token,
        },
        body: JSON.stringify({
        englishName: category.englishName,
        name: category.name,
        icon: category.icon,
        mainCategory: category.isMainCategory,
        }),
    });

    return response
}