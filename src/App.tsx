import { createElement, type JSX } from "react";
import { NavbarDesktop, NavbarMobile } from "./components/navbar";
import useApp from "./hooks/useApp";
import { navbarItems } from "./components/navbar.items";
const App: React.FC = (): JSX.Element | null => {
  const { pageIndex, page, handleChangePage } = useApp();
  const Page = navbarItems.find(navbarItems => navbarItems.id === page)?.page;
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start">
      <NavbarDesktop pageIndex={pageIndex} navbarItems={navbarItems} handleChangePage={handleChangePage}/>
      <NavbarMobile pageIndex={pageIndex} navbarItems={navbarItems} handleChangePage={handleChangePage}/>
      {Page && createElement(Page)}  
    </div>
  );
};
export default App;