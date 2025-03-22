"use client"

import { Category } from "@/app/model/category-model";
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

function MainCategoryCard({setMainCategory, setSubCategory}: {setMainCategory: (category?: Category) => void, setSubCategory: (category?: Category) => void}) {
    const { token } = useSelector((state: RootState) => state.states.user.value)
    const { data: categories, isPending } = useQuery({
        queryKey: ["mainCategories"],
        queryFn: () => getMainCategories(token),
        staleTime: Infinity,
    })
    console.log(categories)
    if (isPending) {
        return <Loading isCentered={true}/>
    }
    const list = categories?.map((category) => {
        return {
            name: category.name,
            value: ""
        };
    });
    const tableRowClickHandle = (selectedNumber: number) => {
        if (categories) {
            setMainCategory(categories[selectedNumber])
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
                <BreadcrumpMenu setMainCategory={setMainCategory} setSubCategory={setSubCategory}/>
                <h2 className="text-center">Főkategória</h2>
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
export default MainCategoryCard

async function getMainCategories(token: string | null): Promise<Category[]> {
    try {
        if (!token) {
            window.location.href = "/bejelentkezes";
            return Promise.reject("Nincs bejelentkezve, átirányítás történt.");
        }

        const response = await fetch(
            `${ENDPOINTURL}/category/main`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
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
