import type { ProductResult } from "../interfaces/data.result.dto";

export default class Product {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
  constructor(para: ProductResult) {
    this.id = para.id;
    this.size = para.size;
    this.hire_period_days = para.hire_period_days;
    this.transport_cost = para.transport_cost ?? null;
    this.per_tonne_cost = para.per_tonne_cost ?? null;
    this.price_before_vat = para.price_before_vat;
    this.vat = para.vat;
    this.postcode = para.postcode;
    this.area = para.area;
    this.forbidden = para.forbidden;
    this.created_at = para.created_at;
    this.updated_at = para.updated_at;
    this.allowed_on_road = para.allowed_on_road;
    this.allows_heavy_waste = para.allows_heavy_waste;
  }
}
