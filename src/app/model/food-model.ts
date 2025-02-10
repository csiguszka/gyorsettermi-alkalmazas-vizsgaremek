export interface Food {
  _id: string;
  name: string;
  material: Material[];
  price: number;
}

interface Material {
  name: string;
  quantity: number;
  _id: string;
  id: string;
}
