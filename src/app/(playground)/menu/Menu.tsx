"use client";

import { useState } from "react";
import MainCategoryCard from "./_components/MainCategoryCard";
import SubCategoryCard from "./_components/SubCategoryCard";
import { Category } from "@/app/model/category-model";
import FoodsCard from "./_components/FoodsCard";

function Menu() {
  const [selectedMainCategory, setSelectedMainCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<Category | null>(null);

  function setMainCategory(category?: Category) {
    console.log("ittmain")
    if (category) {
      setSelectedMainCategory(category)
    }else{
      setSelectedMainCategory(null)
    }
  }
  function setSubCategory(category?: Category) {
    console.log("ittsub")
    if (category) {
      setSelectedSubCategory(category)
    }else{
      setSelectedSubCategory(null)
    }
  }
  return (
    <div>
      {
        !selectedMainCategory ? <MainCategoryCard setMainCategory={setMainCategory} setSubCategory={setSubCategory}/>
        : 
        !selectedSubCategory ? 
        <SubCategoryCard mainCategory={selectedMainCategory} setSubCategory={setSubCategory} setMainCategory={setMainCategory}/>
        : 
        <FoodsCard subCategory={selectedSubCategory} mainCategory={selectedMainCategory} setSubCategory={setSubCategory} setMainCategory={setMainCategory}/>
      }
    </div>
  );
}
export default Menu;
