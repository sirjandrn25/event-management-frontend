import { ReactNode } from "react";

export interface BaseDialogProps {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onToggle?: (value?: boolean) => void;
  rightComponent?: ReactNode;
}
