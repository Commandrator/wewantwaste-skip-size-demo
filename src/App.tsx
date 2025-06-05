import { createElement, type JSX } from "react";
import { NavbarMobile, NavbarDesktop } from "./components/navbar";
import useAppContext from "./hooks/useAppContext";
const App: React.FC = (): JSX.Element | null => {
  const { Page } = useAppContext();
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start">
      <NavbarDesktop />
      <NavbarMobile />
      {Page && createElement(Page)}
    </div>
  );
};
export default App;
