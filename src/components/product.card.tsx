import React from "react";
import { langPack } from "../main";
import type { ProductCardProps } from "../interfaces/props.dto";
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  handleSelectProduct,
}) => {
  const handleSelect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSelectProduct(product);
  };
  return (
    <form
      className="group relative rounded-lg border-2 p-4 dark:border-[#59584F] md:p-6 transition-all  dark:text-[#F2F0D0] cursor-pointer dark:bg-[#59584F]/30"
      onSubmit={handleSelect}
    >
      <div className="relative">
        <div className="absolute top-3 right-2 z-20 bg-[#0037C1]/50 dark:text-[#F2F0D0] px-3 py-1 rounded-full text-sm font-medium shadow-md">
          {langPack.card_size.replace(":size:", product.size.toString())}
        </div>
        <img
          src={`/assets/${product.size}-yarder-skip.jpg`}
          alt="6 Yard Skip"
          className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
        />
        {!product.allowed_on_road && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <span className="text-xs font-medium text-yellow-500">
              {langPack.not_allowed_on_road}
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-4">
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
      <button
        className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2
          dark:bg-[#59584F] dark:text-[#F2F0D0] hover:bg-[#59584F]/60 hover:border-[#0037C1]"
      >
        <span>{langPack.select_this_skip}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-right w-4 h-4"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </form>
  );
};

export default ProductCard;
