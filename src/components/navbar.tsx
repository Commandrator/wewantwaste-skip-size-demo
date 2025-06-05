import React, { useRef, type JSX } from "react";
import type { NavbarItemPros } from "../interfaces/props.dto";
import { langPack } from "../main";
import { SharpKeyboardArrowRight, TwotoneKeyboardArrowLeft } from "../icons";
import useAppContext from "../hooks/useAppContext";
import { navbarItems } from "./navbar.items";

const SCROLL_AMOUNT = 150;

const NavbarMobile: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  };
  const { pageIndex } = useAppContext();
  return (
    <div className="relative w-full md:hidden bg-[#262626] dark:bg-[#262626] py-3 px-15">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 py-2 rounded-r-md text-[#59584F]/30 dark:text-[#F2F0D0]/30 hover:text-[#59584F] hover:dark:text-[#F2F0D0]"
        title="Scroll left"
        aria-label="Scroll left"
      >
        <TwotoneKeyboardArrowLeft className="size-10" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 py-2 rounded-l-md text-[#59584F]/30 dark:text-[#F2F0D0]/30 hover:text-[#59584F] hover:dark:text-[#F2F0D0]"
        title="Scroll right"
        aria-label="Scroll right"
      >
        <SharpKeyboardArrowRight className="size-10" />
      </button>
      <div
        ref={scrollRef}
        className="flex space-x-2 overflow-hidden scrollbar-hide"
      >
        {navbarItems.map((item, index) => (
          <NavbarItem
            key={item.id}
            item={item}
            disabled={index > pageIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const NavbarDesktop: React.FC = (): JSX.Element | null => {
  const { pageIndex } = useAppContext();
  if (!navbarItems) return null;
  return (
    <div className="text-[#262626] dark:text-[#F2F0D0] hidden md:flex flex-col items-start py-5 space-y-4 sticky top-0 z-[8]">
      <div className="absolute z-[7] inset-0 flex items-center justify-center">
        <div className="w-px h-[calc(100%-80px)] bg-[#2A2A2A] dark:bg-[#F2F0D0]" />
      </div>
      {navbarItems.map((item, index) => (
        <NavbarItem
          key={item.id}
          item={item}
          disabled={index > pageIndex}
          index={index}
        />
      ))}
    </div>
  );
};

const NavbarItem: React.FC<NavbarItemPros> = ({
  item,
  disabled = false,
  index,
  ...props
}): JSX.Element => {
  const { handleChangePage } = useAppContext();
  const Icon = item.icon;
  return (
    <button
      {...props}
      disabled={disabled}
      className={`relative z-10 flex items-center justify-start whitespace-nowrap transition-colors border-0 bg-[#F2F0D0] dark:bg-[#262626] ${
        disabled
          ? "cursor-not-allowed text-[#59584F]/30 dark:text-[#F2F0D0]/30"
          : "cursor-pointer"
      }`}
      onClick={() => handleChangePage(index, item.id)}
    >
      <div className="flex flex-col md:flex-row items-center w-full space-y-1 md:space-y-0 md:space-x-2">
        <Icon className="size-5" />
        <span className="select-none text-center md:text-left">
          {langPack[item.text as keyof typeof langPack]}
        </span>
      </div>
    </button>
  );
};

export { NavbarDesktop, NavbarMobile };
export default NavbarDesktop;
