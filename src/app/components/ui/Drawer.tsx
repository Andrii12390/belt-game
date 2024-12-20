import IconButton from '@mui/material/IconButton';
import  { X } from "lucide-react";
import { Drawer as MuiDrawer } from '@mui/material';
import { ReactElement } from 'react';

interface IDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export const Drawer = ({ open, onClose, children }: IDrawerProps) => {
  return (
    <MuiDrawer anchor="right" open={open} onClose={onClose}>
      <aside className="w-80 h-dvh">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="text-yellow-500" />
        </button>
        {children}
      </aside>
    </MuiDrawer>
  );
};