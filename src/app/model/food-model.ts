export interface Food {
  _id: string;
  englishName: string;
  name: string;
  materials: FoodMaterial[];
  price: number;
  categoryId: string;
  subCategoryId: string[]
  isEnabled?: boolean;
  image: string;
}

export interface FoodMaterial {
  quantity: number;
  materialId: string;
  name?: string
}
