import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { Separator } from "./separator";

interface SlidePaneProps {
  title: string;
  description?: string;
  trigger: ReactNode;
  children: ReactNode;
}
export const SlidePane = forwardRef(
  ({ title, description, trigger, children }: SlidePaneProps, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        onOpen: () => setOpen(false),
        onClose: () => setOpen(false),
      };
    });
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {trigger ?? <Button variant="outline">Open</Button>}
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          <Separator className="my-2" />
          {children}
          {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
        </SheetContent>
      </Sheet>
    );
  }
);
SlidePane.displayName = "SlidePane";
