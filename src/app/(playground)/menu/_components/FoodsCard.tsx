"use client"

import { Category } from "@/app/model/category-model";
import { Food } from "@/app/model/food-model";
import { PaginationResponse } from "@/app/model/pagination-model";
import ENDPOINTURL from "@/app/url";
import BreadcrumpMenu from "@/components/BreadcrumpMenu";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from "@/state/store";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

const MotionCard = motion.create(Card);

interface FoodsCardProps {
    mainCategory: Category;
    subCategory: Category;
    setSubCategory: (category?: Category) => void;
    setMainCategory: (category?: Category) => void;
}

function FoodsCard({ mainCategory, subCategory, setSubCategory, setMainCategory }: FoodsCardProps) {
    const { token } = useSelector((state: RootState) => state.states.user.value)
    const { data: foods, isPending } = useQuery({
        queryKey: ["Foods", subCategory],
        queryFn: () => getFoods(subCategory._id, token),
        staleTime: Infinity,
        enabled: !!token
    })
    console.log(foods)
    if (isPending) {
        return <Loading isCentered={true}/>
    }
    const list = foods?.items.map((food) => {
        return {
            name: food.name,
            value: ""
        };
    });
    const tableRowClickHandle = (selectedNumber: number) => {
        if (foods) {
            console.log(selectedNumber)
            //setSelectedFood
        }
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
                    <BreadcrumpMenu mainCategory={mainCategory.name} subCategory={subCategory.name} setMainCategory={setMainCategory} setSubCategory={setSubCategory}/>
                    <h2 className="text-center">Ételek</h2>
                </CardHeader>
                <CardContent>
                    {list &&
                        <Table
                            list={list}
                            RowSelectedIdx={null}
                            onClick={tableRowClickHandle}
                        ></Table>
                    }
                </CardContent>
            </MotionCard>
        </div>
    )
}

async function getFoods(subCategoryId: string, token: string | null): Promise<PaginationResponse<Food[]>> {
    try {
        if (!token) {
            window.location.href = "/login";
            return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
        }
        console.log(subCategoryId);
        const response = await fetch(
            `${ENDPOINTURL}/food?subCategoryId=${subCategoryId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                    'Accept-Language': 'hu',
                },
            }
        );

        return response.json();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Something went wrong: ${error.message}`);
        } else {
            throw new Error("Something went wrong");
        }
    }
}

export default FoodsCard