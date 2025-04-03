import { Category } from "@/app/model/category-model";
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


const MotionCard = motion.create(Card);


function SubCategoryForm({ category, mainCategory }: { category?: Category, mainCategory: Category }) {
  const { token } = useSelector((state: RootState) => state.states.user.value)
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>(category?.name || "");
  const [englishName, setEnglishName] = useState<string>(category?.englishName || "");
  const [isLoading, setIsloading] = useState(false);
  const queryClient = useQueryClient();

  const { toast } = useToast()
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !englishName) {
      setError("A név és angol név mezőt kötelező kitölteni.")
      setIsloading(false);
      return
    }
    const newSubCategory: Category = {
      _id: category?._id || "",
      englishName: englishName,
      icon: "",
      name: name,
      mainCategory: mainCategory._id
    };
    const response = category?._id ? await handleModify(newSubCategory, token) : await handleCreate(newSubCategory, token)
    if (response?.status === 200) {
      if (category?._id) {
        toast({ title: "Az alkategória módosítása sikeres" })

      } else {
        toast({ title: "Az alkategória sikeresen létrehozva" })
      }
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    } else {
      if (category?._id) {
        toast({ title: "Az alkategória mósoítása sikertelen", variant: "destructive" })
      } else {
        toast({ title: "Az alkategória létrehozása sikertelen", variant: "destructive" })
      }
    }
    setIsloading(false);
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
          Új alapanyag
        </h2>
        <CardContent>
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
        </CardContent>
      </CardHeader>
    </MotionCard>
  )
}
export default SubCategoryForm


const handleCreate = async (category: Category, token: string | null) => {
  if (!token) {
    window.location.href = "/login";
    return;
  }
  console.log("POST")
  console.log(category)
  const response = await fetch(`${ENDPOINTURL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      englishName: category.englishName,
      name: category.name,
      icon: "no.svg",
      mainCategory: category.mainCategory,
    }),
  });
  console.log(response)
  return response
}

const handleModify = async (category: Category, token: string | null) => {
  if (!token) {
    window.location.href = "/login";
    return;
  }
  console.log(category)
  console.log(`${ENDPOINTURL}/category/${category._id}`)
  const response = await fetch(`${ENDPOINTURL}/category/${category._id}`, {
    method: "PUT",
    headers: {
      "accept": "*/*",
      "Content-Type": "application/json",
      "Accept-Language": "hu",
      Authorization: token,
    },
    body: JSON.stringify({
      "name": category.name,
      "icon": "no.svg",
      "englishName": category.englishName,
      "mainCategory": category.mainCategory
    }),
  });
  console.log(response)
  return response
}