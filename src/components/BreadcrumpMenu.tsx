import { Category } from "@/app/model/category-model";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

interface BreadcrumpMenuProps {
    mainCategory?: string;
    subCategory?: string;
    setMainCategory: (category?: Category) => void;
    setSubCategory: (category?: Category) => void;
}

function BreadcrumpMenu({ mainCategory, subCategory, setMainCategory, setSubCategory }: BreadcrumpMenuProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <span onClick={() => {setMainCategory(); setSubCategory()}} className="cursor-pointer hover:bg-primary_opacity rounded-[1rem] p-2">Főkategória</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {mainCategory && (
                    <>
                        <BreadcrumbSeparator>
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span onClick={() => setSubCategory()}  className="cursor-pointer hover:bg-primary_opacity rounded-[1rem] p-2">{mainCategory}</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )
                }
                {subCategory && (
                    <>
                        <BreadcrumbSeparator>
                            <ChevronRight />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <span  className="cursor-pointer hover:bg-primary_opacity rounded-[1rem] p-2">{subCategory}</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default BreadcrumpMenu