import { useState, cache } from "react";
import Product from "../classes/product";
const useApp = () => {
  const [page, setPage] = useState<string>("select-skip");
  const [pageIndex, setPageIndex] = useState<number>(2);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [productResult, setProductResult] = useState<Product[] | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const listProduct = cache(async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL);
      const data = await response.json();
      if (response.ok) {
        const products = data.map((item: Product) => new Product(item));
        setProductResult(products);
        setLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  });
  const handleChangePage = (index: number, id?: string) => {
    setPageIndex(index);
    if (id) setPage(id);
  };
  const handleDialogClose = () =>{
    setSelectedProduct(undefined);
  }
  const handleSelectProduct = (product:Product) => {
    setSelectedProduct(product);
  }
  return {
    listProduct,
    loaded,
    setLoaded,
    productResult,
    setProductResult,
    page,
    setPage,
    pageIndex,
    setPageIndex,
    handleChangePage,
    selectedProduct,
    setSelectedProduct,
    handleDialogClose,
    handleSelectProduct
  };
};

export default useApp;
