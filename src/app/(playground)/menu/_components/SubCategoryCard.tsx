"use client"

import { Category } from "@/app/model/category-model";
import { PaginationResponse } from "@/app/model/pagination-model";
import ENDPOINTURL from "@/app/url";
import BreadcrumpMenu from "@/components/BreadcrumpMenu";
import Loading from "@/components/Loading";
import PlusButton from "@/components/PlusButton";
import Table from "@/components/Table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/state/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SubCategoryForm from "./SubCategoryForm";

const MotionCard = motion.create(Card);

function SubCategoryCard({mainCategory, setSubCategory, setMainCategory}: {mainCategory: Category, setSubCategory: (category?: Category) => void, setMainCategory: (category?: Category) => void}) {
    const { token } = useSelector((state: RootState) => state.states.user.value)
    const queryClient = useQueryClient();
    const { data: categories, isPending } = useQuery({
        queryKey: ["subCategories", mainCategory._id],
        queryFn: () => getSubCategories(mainCategory._id, token),
        enabled: !!token
    })
    const [newSubCategory, setNewSubCategory] = useState<boolean>(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
    console.log(selectedCategory)
    const {toast} = useToast()
    if (isPending) {
        return <Loading isCentered={true}/>
    }
    const handleTrashOnClick = async (event: React.MouseEvent, id: string) => {
        event.stopPropagation();
        const response = await deleteSubCategories(id, token);
        if (response.status === 200) {
            toast({title: "Az alkategóriát töröltük"})
            queryClient.invalidateQueries({ queryKey: ["subCategories", mainCategory._id] });
        }else{
            toast({title: "A törlés sikertelen!", variant: "destructive"})
        }
    }
    const handleEditOnClick = (event: React.MouseEvent, category: Category) => {
        event.stopPropagation();
        console.log("HMM")
        console.log(category)
        setSelectedCategory(category)
        setNewSubCategory(false)
    }
    const list = categories?.items.map((category) => {
        const buttons = <div className="flex gap-2">
            <Edit onClick={(event) => handleEditOnClick(event, category)}/>
            <Trash2 className="text-destructive" onClick={(event) => handleTrashOnClick(event, category._id)}/>
        </div>
        return {
            name: category.name,
            value: buttons
        };
    });
    const tableRowClickHandle = (selectedNumber: number) => {
        if (categories) {
            setSubCategory(categories.items[selectedNumber])
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
                <BreadcrumpMenu mainCategory={mainCategory.name} setMainCategory={setMainCategory} setSubCategory={setSubCategory}/>
                <h2 className="text-center">Alkategória</h2>
            </CardHeader>
            <CardContent>
                {list &&
                    <Table
                        list={list}
                        RowSelectedIdx={null}
                        onClick={tableRowClickHandle}
                    ></Table>
                }
                <div className="mt-2">
                    <PlusButton clickHandle={() => {setNewSubCategory(true); setSelectedCategory(undefined)}} />
                </div>
            </CardContent>
        </MotionCard>
        {newSubCategory && <SubCategoryForm/>}
        {selectedCategory && <SubCategoryForm key={selectedCategory._id} category={selectedCategory}/>}
        </div>
    )
}

async function getSubCategories(mainCategoryId: string, token: string | null): Promise<PaginationResponse<Category[]>> {
    try {
        if (!token) {
            window.location.href = "/login";
            return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
        }

        const response = await fetch(
            `${ENDPOINTURL}/category?mainCategory=${mainCategoryId}&&isMainCategory=false`,
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

async function deleteSubCategories(mainCategoryId: string, token: string | null): Promise<Response> {
    try {
        if (!token) {
            window.location.href = "/login";
            return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
        }

        const response = await fetch(
            `${ENDPOINTURL}/category/${mainCategoryId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                    'Accept-Language': 'hu',
                },
            }
        );
        return response

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Something went wrong: ${error.message}`);
        } else {
            throw new Error("Something went wrong");
        }
    }
}

export default SubCategoryCard