export interface Material {
  _id?: string;
  name: string;
  englishName: string;
  unit: string;
  inStock?: number;
  isEnough?: boolean;
  usegeOneWeekAgo?: number;
}