import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { forwardRef, useImperativeHandle } from "react";
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
  (
    {
      title,
      description,
      trigger,
      children,
      onToggle,
      rightComponent,
      open: openProps,
    }: ModalDialogProps,
    ref
  ) => {
    const [open, setOpen] = useUncontrolled({
      value: openProps,
      onChange: onToggle,
    });

    useImperativeHandle(ref, () => {
      return {
        onOpen: () => setOpen(false),
        onClose: () => setOpen(false),
      };
    });
    const isHeaderVisible = !!title;
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {!!trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent className="sm:max-w-[425px]">
          {isHeaderVisible && (
            <DialogHeader>
              <div className="flex justify-between items-center">
                <div className="grid justify-start gap-2">
                  {!!title && <DialogTitle>{title}</DialogTitle>}

                  {description && (
                    <DialogDescription>{description}</DialogDescription>
                  )}
                </div>
                {rightComponent ?? <div />}
              </div>
            </DialogHeader>
          )}
          {isHeaderVisible && <Separator className="my-2" />}
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);
ModalDialog.displayName = "ModalDialog";
