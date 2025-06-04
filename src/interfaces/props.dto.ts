import type Product from "../classes/product";
export interface ProductCardProps {
  product: Product;
  handleSelectProduct: (product: Product) => void;
}
export interface ProductDialogProps {
  handleDialogClose: () => void;
  product: Product;

}
export interface NavbarItemDTO {
  id: string;
  icon: string;
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