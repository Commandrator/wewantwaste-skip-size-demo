import type React from "react";
import { useEffect, useRef } from "react";
import type { ProductDialogProps } from "../interfaces/props.dto";
import { langPack } from "../main";

const ProductDialog: React.FC<ProductDialogProps> = ({
  product,
  handleDialogClose,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div
        ref={dialogRef}
        className="bg-[#1C1C1C] rounded-lg w-full max-w-3xl my-4 flex flex-col md:flex-row"
      >
        <div className="md:w-1/2 p-4">
          <div className="text-white text-xl font-semibold mb-2 uppercase">{langPack.yard.replace(":size:",product.size.toString())}
          </div>
          <img
            src={`/assets/${product.size}-yarder-skip.jpg`}
            alt={`${product.size} Yard Skip`}
            className="w-full h-48 md:h-60 object-cover rounded-md mb-4"
          />
          <div className="mb-3 text-xs text-gray-400 text-center leading-snug">
            {langPack.selects_skip_about}
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between gap-4">
          <div className="w-full">
            <table className="w-full text-sm dark:text-[#D9D4BA] mb-4">
              <thead>
                <tr>
                  <th className="pr-2 py-1 text-left uppercase" colSpan={2}>
                    {langPack.service_details}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pr-2 py-1">Boyut</td>
                  <td>
                    {langPack.yard.replace(":size:", product.size.toString())}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">Posta Kodu</td>
                  <td>{product.postcode}</td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">Kiralama Süresi</td>
                  <td>
                    {langPack.period_days.replace(
                      ":day:",
                      product.hire_period_days.toString()
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">Yol Üstü Kullanım</td>
                  <td>{langPack[product.allowed_on_road ? "yes" : "no"]}</td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">Ağır Atık Kabul</td>
                  <td>{langPack[product.allows_heavy_waste ? "yes" : "no"]}</td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">Yasaklı</td>
                  <td>{langPack[product.forbidden ? "yes" : "no"]}</td>
                </tr>
              </tbody>
            </table>
            <table className="w-full text-sm dark:text-[#D9D4BA] mt-4">
              <thead>
                <tr>
                  <th className="pr-2 py-1 text-left uppercase" colSpan={2}>
                    {langPack.day_rental_fee.replace(
                      ":day:",
                      product.hire_period_days.toString()
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="pr-2 py-1">{langPack.excl_vat}</td>
                  <td>
                    {langPack.price_before_vat.replace(
                      ":price_before_vat:",
                      product.price_before_vat.toFixed(2)
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 py-1">
                    {langPack.vat_persentage.replace(
                      ":vat:",
                      product.vat.toString()
                    )}
                  </td>
                  <td>
                    {langPack.price_before_vat.replace(
                      ":price_before_vat:",
                      (product.price_before_vat * (product.vat / 100)).toFixed(
                        2
                      )
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 py-1 font-semibold">
                    {langPack.incl_vat}
                  </td>
                  <td className="font-semibold">
                    {langPack.price_before_vat.replace(
                      ":price_before_vat:",
                      (
                        product.price_before_vat +
                        product.price_before_vat * (product.vat / 100)
                      ).toFixed(2)
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="w-full" onClick={handleDialogClose}>
              {langPack.close}
            </button>
            <button className="btn-primary w-full">{langPack.continue}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDialog;
