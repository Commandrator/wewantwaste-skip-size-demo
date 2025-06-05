import React, { useEffect, useRef } from "react";
import type { InfoGrid, ProductProps } from "../interfaces/props.dto";
import { langPack } from "../main";
import useAppContext from "../hooks/useAppContext";

const ProductDialog: React.FC<ProductProps> = ({ product }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { handleDialogClose, handleSelect } = useAppContext();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        handleDialogClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDialogClose]);
  const section = [
    {
      id: 1,
      title: langPack.service_details,
      items: [
        {
          id: 1,
          key: langPack.size,
          value: langPack.yard.replace(":size:", product.size.toString()),
        },
        { id: 2, key: langPack.postcode, value: product.postcode },
        {
          id: 3,
          key: langPack.hire_period,
          value: langPack.period_days.replace(
            ":day:",
            product.hire_period_days.toString()
          ),
        },
        {
          id: 4,
          key: langPack.allowed_on_road,
          value: langPack[product.allowed_on_road ? "yes" : "no"],
        },
        {
          id: 5,
          key: langPack.allows_heavy_waste,
          value: langPack[product.allows_heavy_waste ? "yes" : "no"],
        },
      ],
    },
    {
      id: 2,
      title: langPack.day_rental_fee.replace(
        ":day:",
        product.hire_period_days.toString()
      ),
      items: [
        {
          id: 7,
          key: langPack.excl_vat,
          value: langPack.price_before_vat.replace(
            ":price_before_vat:",
            product.price_before_vat.toFixed(2)
          ),
        },
        {
          id: 8,
          key: langPack.vat_persentage.replace(":vat:", product.vat.toString()),
          value: langPack.price_before_vat.replace(
            ":price_before_vat:",
            (product.price_before_vat * (product.vat / 100)).toFixed(2)
          ),
        },
        {
          id: 9,
          key: langPack.incl_vat,
          value: langPack.price_before_vat.replace(
            ":price_before_vat:",
            (
              product.price_before_vat +
              product.price_before_vat * (product.vat / 100)
            ).toFixed(2)
          ),
        },
      ],
    },
  ];
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto max-h-screen">
      <div
        ref={dialogRef}
        className="bg-[#F2F0D0] dark:bg-[#262626] rounded-lg w-full max-w-3xl my-4 flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-4">
          <div className="text-xl font-semibold mb-2 uppercase">
            {langPack.yard.replace(":size:", product.size.toString())}
          </div>
          <img
            src={`/assets/${product.size}-yarder-skip.jpg`}
            alt={`${product.size} Yard Skip`}
            className="w-full h-48 md:h-60 object-cover rounded-md mb-4"
          />
          <div className="mb-3 text-xs text-[#59584F]/70 dark:text-[#F2F0D0]/70 text-center leading-snug">
            {langPack.selects_skip_about}
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between gap-4">
          <div className="w-full space-y-6 text-sm">
            <InfoGrid sections={section} />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center
          dark:bg-[#59584F] dark:text-[#F2F0D0] hover:bg-[#59584F]/30 hover:border-2" onClick={handleDialogClose}>
              {langPack.close}
            </button>
            <button className="w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center
          dark:bg-[#59584F] dark:text-[#F2F0D0] hover:bg-[#59584F]/30 hover:border-2" onClick={()=>handleSelect(product)}>{langPack.continue}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export function InfoGrid({ sections }: Readonly<InfoGrid>) {
  return (
    <div className="w-full space-y-6 text-sm">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-xs font-semibold uppercase mb-2">
            {section.title}
          </h2>
          <dl className="ml-[20px] grid grid-cols-2 gap-x-4 gap-y-1">
            {section.items.map(({ id, key, value }) => (
              <React.Fragment key={id}>
                <dt className="font-bold">{key}</dt>
                <dd>{value}</dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

export default ProductDialog;
