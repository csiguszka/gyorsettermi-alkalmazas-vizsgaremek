import { Trash2 } from "lucide-react";

interface DeleteButton {
  onClick: () => void;
}
function DeleteButton({ onClick }: DeleteButton) {
  return (
    <Trash2 className="text-destructive cursor-pointer" onClick={onClick} />
  );
}
export default DeleteButton;
