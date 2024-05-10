import { Button } from "@/components/ui/button";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Separator } from "./separator";
import { BaseDialogProps } from "./types/dialog.type";

interface ModalDialogProps extends BaseDialogProps {}
export const ModalDialog = forwardRef(
  ({ title, description, trigger, children }: ModalDialogProps, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        onOpen: () => setOpen(false),
        onClose: () => setOpen(false),
      };
    });
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger ?? <Button variant="outline">Open</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>

            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <Separator className="my-2" />
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
ModalDialog.displayName = "ModalDialog";
