import { X, Menu } from "lucide-react";

interface IDrawerToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const DrawerToggle = ({ isOpen, onClick }: IDrawerToggleProps) => {
  return (
    <button onClick={onClick} className="absolute right-2 top-3 text-yellow-500">
      {isOpen ? <X /> : <Menu />}
    </button>
  );
};
