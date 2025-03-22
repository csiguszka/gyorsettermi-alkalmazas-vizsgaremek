export interface Food {
  _id: string;
  englishName: string;
  name: string;
  material: Material[];
  price: number;
  categoryId: string;
  subCategoryId: string[]
  image: string;
}

interface Material {
  quantity: number;
  materialId: string;
}
