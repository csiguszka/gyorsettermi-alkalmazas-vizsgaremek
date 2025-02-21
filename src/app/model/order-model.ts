export interface Order {
  _id: string;
  costumerID: string;
  isFinished: boolean;
  orderedTime: string;
  orderedProducts: OrderedProduct[];
  orderNumber?: number;
}

interface OrderedProduct {
  name: string;
  quantity: number;
  _id: string;
  id: string;
}
