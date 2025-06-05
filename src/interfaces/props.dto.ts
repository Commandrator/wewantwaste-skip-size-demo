import type { SVGProps } from "react";
import type Product from "../classes/product";
export interface ProductProps {
  product: Product;
}
export type SVGProp = SVGProps<SVGSVGElement>;
export interface NavbarItemDTO {
  id: string;
  icon: React.ComponentType<SVGProp>;
  text: string;
  page?: React.FC | null
}
export interface NavbarItemPros {
  item: NavbarItemDTO;
  index: number
  disabled?: boolean;
}
export interface ContentLayerProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
}
export interface PagesProps {
  productResult?: Product[];
  loaded?: boolean;
}
export interface InfoItem {
  id: string | number;
  key: string;
  value: string;
};
export interface InfoSection {
  id: string | number;
  title: string;
  items: InfoItem[];
}
export interface InfoGrid {
  sections: InfoSection[];
}