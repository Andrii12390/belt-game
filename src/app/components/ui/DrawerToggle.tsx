import { IconButton } from "@mui/material";
import { X, Menu } from "lucide-react";

interface IDrawerToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

export const DrawerToggle = ({ isOpen, onClick }: IDrawerToggleProps) => {
  return (
    <IconButton onClick={onClick} className="absolute -right-0 text-yellow-500">
      {isOpen ? <X /> : <Menu />}
    </IconButton>
  );
};
