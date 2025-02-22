import { PenBox, Trash2 } from "lucide-react";

function ModifyDeleteButtons() {
  return (
    <div className="flex gap-2">
      <PenBox className="cursor-pointer" />
      <Trash2 className="text-destructive cursor-pointer" />
    </div>
  );
}
export default ModifyDeleteButtons;
