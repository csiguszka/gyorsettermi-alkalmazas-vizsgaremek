import { Button } from "./ui/button";

interface plusButtonProps {
  clickHandle: () => void;
}

function PlusButton({ clickHandle }: plusButtonProps) {
  return (
    <Button
      className="btn w-5 h-5 p-4 rounded-full"
      onClick={() => clickHandle()}
    >
      +
    </Button>
  );
}
export default PlusButton;
