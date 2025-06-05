import React from "react";
import { langPack } from "../main";
import type { ProductProps } from "../interfaces/props.dto";
import useAppContext from "../hooks/useAppContext";
import { Arrow, Warning } from "../icons";
const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { handleSelectProduct, handleSelect } = useAppContext();
  return (
    <div className="group relative rounded-lg border-2 group-hover:dark:border-[#59584F] group-hover:border-[#F2F0D0] dark:border-[#59584F]/20 border-[#F2F0D0] transition-all  dark:text-[#F2F0D0] cursor-pointer bg-[#F2F0D0]/30 hover:bg-[#F2F0D0]/70 dark:bg-[#59584F]/30 dark:hover:bg-[#59584F]/60 outline-none">
      <button
        onClick={() => handleSelectProduct(product)}
        className="relative w-full"
      >
        <img
          src={`/assets/${product.size}-yarder-skip.jpg`}
          alt={`${product.size} Yard Skip`}
          className="w-full h-40 md:h-48 object-cover rounded-md mb-4"
        />
        <div className="absolute top-5 right-10 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {langPack.card_size.replace(":size:", product.size.toString())}
        </div>
        {!product.allowed_on_road && (
          <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Warning className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0" />
            <span className="text-xs font-medium text-yellow-500">
              {langPack.not_allowed_on_road}
            </span>
          </div>
        )}
      </button>
      <div className="flex justify-between items-start mb-4 px-3">
        <div>
          <h3 className="text-lg md:text-xl font-bold dark:text-[#F2F0D0]">
            {langPack.card_size_skip.replace(":size:", product.size.toString())}
          </h3>
          <p className="text-sm dark:text-[#D9D4BA] mb-4 md:mb-6">
            {langPack.hire_period_days.replace(
              ":day:",
              product.hire_period_days.toString()
            )}
          </p>
        </div>
        <div>
          <span className="text-xl md:text-2xl font-bold dark:text-[#D9D4BA]">
            {langPack.price_before_vat.replace(
              ":price_before_vat:",
              product.price_before_vat.toString()
            )}
          </span>
        </div>
      </div>
      <div className="relative p-3">
        <button
          type="button"
          onClick={() => handleSelect(product)}
          className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center
          dark:bg-[#59584F] dark:text-[#F2F0D0] hover:bg-[#59584F]/30 hover:border-2"
        >
          <span>{langPack.select_this_skip}</span>
          <Arrow className="lucide lucide-arrow-right w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
