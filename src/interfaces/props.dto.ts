import type { SVGProps } from "react";
import type Product from "../classes/product";
export interface ProductCardProps {
  product: Product;
  handleSelectProduct: (product: Product) => void;
}
export interface ProductDialogProps {
  handleDialogClose: () => void;
  product: Product;

}
export type SVGProp = SVGProps<SVGSVGElement>;
export interface NavbarItemDTO {
  id: string;
  icon: React.ComponentType<SVGProp>;
  text: string;
  page?: React.FC | null
}
export interface NavbarItemsDTO {
  pageIndex: number;
  navbarItems: NavbarItemDTO[];
  handleChangePage: (index: number, item?: string) => void;
}
export interface NavbarItemPros {
  item: NavbarItemDTO;
  index: number
  disabled?: boolean;
  handleChangePage: (index: number, item?: string) => void;
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