import React, { useState, useMemo, cache } from "react";
import Product from "../classes/product";
import { AppContext } from "./app.context";
import { navbarItems } from "../components/navbar.items";
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState("select-skip");
  const [pageIndex, setPageIndex] = useState(2);
  const [loaded, setLoaded] = useState(false);
  const [productResult, setProductResult] = useState<Product[]>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  
  const Page = navbarItems.find((navbarItems) => navbarItems.id === page)?.page;
  const listProduct = cache(async (): Promise<Product[] | undefined> => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      const data = await response.json();
      if (response.ok) {
        const products = data.map((item: Product) => new Product(item));
        setProductResult(products);
        setLoaded(true);
        return products;
      }
    } catch (err) {
      console.error(err);
    }
    return undefined;
  });

  const handleChangePage = (index: number, id?: string) => {
    setPageIndex(index);
    if (id) setPage(id);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDialogClose = () => {
    setSelectedProduct(undefined);
  };
  const handleSelect = (product: Product) => {
    setPageIndex(3)
    setPage("permit-check")
    setSelectedProduct(product);
  };
  const value = useMemo(
    () => ({
      page,
      pageIndex,
      handleChangePage,
      loaded,
      productResult,
      selectedProduct,
      listProduct,
      handleSelectProduct,
      handleDialogClose,
      handleSelect,
      Page
    }),
    [page, pageIndex, loaded, productResult, selectedProduct, listProduct, Page]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
