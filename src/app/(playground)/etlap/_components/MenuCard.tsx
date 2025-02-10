import { Food } from "@/app/model/food-model";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function MenuCard({ food }: { food: Food[] }) {
  return (
    <div className="w-full md:w-[400px] m-auto">
      {food.map((food) => (
        <Accordion key={food._id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-xl">
              {food.name}
            </AccordionTrigger>
            <AccordionContent>
              {food.material.map((material) => (
                <div key={material._id} className="flex justify-between">
                  <p>{material.name}</p>
                  <p>{material.quantity}g</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
export default MenuCard;
