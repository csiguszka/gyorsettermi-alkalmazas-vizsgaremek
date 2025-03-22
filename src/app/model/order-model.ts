export interface Order {
  _id: string;
  costumerId: string;
  orderedTime: string;
  totalPrice: number;
  finishedCokingTime: null;
  finishedTime: null;
  orderedProducts: OrderedProduct[];
  orderNumber: number;
}

interface OrderedProduct {
  quantity: number;
  details: Details;
}

interface Details {
  name?: string;
  englishName: string;
  materials: Material[];
  price: number;
  isEnabled: boolean;
  categoryId: string;
  subCategoryId: string[];
  image: string;
}

interface Material {
  _id: string;
  quantity: number;
}
