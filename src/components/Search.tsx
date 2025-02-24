import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface SearchProps {
  placholder: string;
}

function Search({ placholder }: SearchProps) {
  return (
    <div className="flex gap-2">
      <Input placeholder={placholder} />
      <Button className="btn">Keresés</Button>
    </div>
  );
}
export default Search;
