import { Trash2 } from "lucide-react";

interface DeleteButton {
  onClick: () => void;
}
function DeleteButton({ onClick }: DeleteButton) {
  console.log(onClick);
  return (
    <Trash2 className="text-destructive cursor-pointer" onClick={onClick} />
  );
}
export default DeleteButton;
