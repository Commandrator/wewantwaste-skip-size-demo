import { createContext } from "react";
import Product from "../classes/product";
import type { NavbarItemPros } from "../interfaces/props.dto";

type AppContextType = {
  page: string;
  pageIndex: number;
  handleChangePage: (index: number, id?: string) => void;
  loaded: boolean;
  productResult?: Product[];
  selectedProduct?: Product;
  listProduct: () => Promise<Product[] | undefined>;
  handleSelectProduct: (product: Product) => void;
  handleDialogClose: () => void;
  Page: React.FC<NavbarItemPros> | null | undefined;
  handleSelect: (product: Product) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);
export type { AppContextType };
