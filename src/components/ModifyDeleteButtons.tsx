import { PenBox, Trash2 } from "lucide-react";

function ModifyDeleteButtons() {
  return (
    <div className="flex gap-2">
      <PenBox />
      <Trash2 className="text-destructive" />
    </div>
  );
}
export default ModifyDeleteButtons;
