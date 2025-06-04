import React, { type JSX } from "react";
import type { NavbarItemsDTO, NavbarItemPros } from "../interfaces/props.dto";
import { langPack } from "../main";

const NavbarDesktop: React.FC<NavbarItemsDTO> = ({
  pageIndex,
  navbarItems,
  handleChangePage,
}): JSX.Element | null => {
  if (!navbarItems) return null;

  return (
    <div className="text-[#262626] dark:text-[#F2F0D0] hidden md:flex flex-col items-start py-5 space-y-4 sticky top-0 z-[8]">
      <div className="absolute z-[7] inset-0 flex items-center justify-center ml-8">
        <div className="w-px h-[calc(100%-80px)] bg-[#2A2A2A] dark:bg-[#F2F0D0]" />
      </div>
      {navbarItems.map((item, index) => (
        <NavbarItem
          key={item.id}
          item={item}
          disabled={index > pageIndex}
          handleChangePage={handleChangePage}
          index={index}
        />
      ))}
    </div>
  );
};

const NavbarMobile: React.FC<NavbarItemsDTO> = ({
  pageIndex,
  navbarItems,
  handleChangePage,
}): JSX.Element | null => {
  if (!navbarItems) return null;
  return (
    <div className="text-[#262626] dark:text-[#F2F0D0] md:hidden flex flex-row items-center space-x-4 py-5">
      {navbarItems.map((item, index) => (
        <NavbarItem
          key={item.id}
          item={item}
          disabled={index > pageIndex}
          handleChangePage={handleChangePage}
          index={index}
        />
      ))}
    </div>
  );
};

const NavbarItem: React.FC<NavbarItemPros> = ({
  item,
  disabled = false,
  handleChangePage,
  index,
  ...props
}): JSX.Element => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`relative z-10 flex items-center justify-start whitespace-nowrap transition-colors border-0 bg-[#F2F0D0] dark:bg-[#262626] text-[#59584F] dark:text-[#F2F0D0] ${
        disabled
          ? "cursor-not-allowed text-[#59584F]/30 dark:text-[#F2F0D0]/30"
          : "cursor-pointer"
      }`}
      onClick={() => handleChangePage(index, item.id)}
    >
      <div className="flex flex-col md:flex-row items-center w-full space-y-1 md:space-y-0 md:space-x-2">
        <img src={item.icon} alt="" className="select-none" draggable="false" />
        <span className="select-none text-center md:text-left">
          {langPack[item.text as keyof typeof langPack]}
        </span>
      </div>
    </button>
  );
};

export { NavbarDesktop, NavbarMobile };
export default NavbarDesktop;
