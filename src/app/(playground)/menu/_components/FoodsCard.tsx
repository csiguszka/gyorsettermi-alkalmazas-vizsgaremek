import { Category } from "@/app/model/category-model";
import { Food } from "@/app/model/food-model";
import { PaginationResponse } from "@/app/model/pagination-model";
import ENDPOINTURL from "@/app/url";
import BreadcrumpMenu from "@/components/BreadcrumpMenu";
import Loading from "@/components/Loading";
import PlusButton from "@/components/PlusButton";
import Table from "@/components/Table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from "@/state/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FoodForm from "./FoodForm";

const MotionCard = motion.create(Card);

interface FoodsCardProps {
  mainCategory: Category;
  subCategory: Category;
  setSubCategory: (category?: Category) => void;
  setMainCategory: (category?: Category) => void;
}

function FoodsCard({ mainCategory, subCategory, setSubCategory, setMainCategory }: FoodsCardProps) {
  const { token } = useSelector((state: RootState) => state.states.user.value);
  const queryClient = useQueryClient();
  const { data: foods, isPending } = useQuery({
    queryKey: ["Foods", subCategory._id],
    queryFn: () => getFoods(subCategory._id, token),
    enabled: !!token,
  });
  const [newFood, setNewFood] = useState<boolean>();
  const [selectedFood, setSelectedFood] = useState<Food | undefined>();
  
  const handleTrashOnClick = async (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    console.log("Hmmm")
    const response = await deleteFood(id, token);
    console.log(response)
    if (response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["Foods", subCategory._id] });
    }
  };

  const list = foods?.items.map((food) => {
    const buttons = (
      <div className="flex gap-2">
        <Edit />
        <Trash2 className="text-destructive" onClick={(event) => handleTrashOnClick(event, food._id)} />
      </div>
    );
    return {
      name: food.name,
      value: buttons,
    };
  });

  const tableRowClickHandle = (selectedNumber: number) => {
    setNewFood(undefined)
    setSelectedFood(foods?.items[selectedNumber])
  };

  if (isPending) {
    return <Loading isCentered={true} />;
  }

  return (
    <div className="flex flex-col w-full justify-center lg:flex-row lg:justify-around gap-3">
      <MotionCard
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        className="card max-w-full lg:w-1/3"
      >
        <CardHeader>
          <BreadcrumpMenu mainCategory={mainCategory.name} subCategory={subCategory.name} setMainCategory={setMainCategory} setSubCategory={setSubCategory} />
          <h2 className="text-center">{subCategory.name}</h2>
        </CardHeader>
        <CardContent>
          {list && (
            <Table list={list} RowSelectedIdx={null} onClick={tableRowClickHandle}></Table>
          )}
          <div className="mt-2">
            <PlusButton clickHandle={() => {setNewFood(true); setSelectedFood(undefined)}} />
          </div>
        </CardContent>
      </MotionCard>
      {newFood && <FoodForm mainCategory={mainCategory} subCategory={subCategory} />}
      {selectedFood && <FoodForm key={selectedFood._id} mainCategory={mainCategory} subCategory={subCategory} food={selectedFood}/>}
    </div>
  );
}

async function getFoods(subCategoryId: string, token: string | null): Promise<PaginationResponse<Food[]>> {
  try {
    if (!token) {
      window.location.href = "/login";
      return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
    }
    const response = await fetch(
      `${ENDPOINTURL}/food?subCategoryId=${subCategoryId}&fields=englishName`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          'Accept-Language': 'hu',
        },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Something went wrong");
  }
}

async function deleteFood(foodId: string, token: string | null): Promise<Response> {
  try {
    if (!token) {
      window.location.href = "/login";
      return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
    }
    const response = await fetch(`${ENDPOINTURL}/food/${foodId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        'Accept-Language': 'hu',
      },
    });
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Something went wrong");
  }
}

export default FoodsCard;
