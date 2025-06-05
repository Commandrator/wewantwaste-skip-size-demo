import { useEffect, type JSX } from "react";
import ContentLayer from "../components/content.layer";
import ProductCard from "../components/product.card";
import { langPack } from "../main";
import Loader from "../components/loader";
import ProductDilaog from "../components/product.dilaog";
import useAppContext from "../hooks/useAppContext";
const SkipSizePage: React.FC = (): JSX.Element | null => {
  const {
    listProduct,
    loaded,
    productResult,
    selectedProduct
  } = useAppContext();
  useEffect(() => {
    if (!loaded || !productResult) listProduct();
  }, [loaded, listProduct, productResult]);
  return (
    <ContentLayer
      title={langPack.select_skip_page_title}
      subTitle={langPack.select_skip_page_subtitle}
    >
      <hr className="mx-20" />
      {selectedProduct && (
        <ProductDilaog
          product={selectedProduct}
        />
      )}
      {!loaded && <Loader />}
      <div className="h-auto p-4 mx-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productResult &&
          productResult.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
      </div>
    </ContentLayer>
  );
};
export default SkipSizePage;
