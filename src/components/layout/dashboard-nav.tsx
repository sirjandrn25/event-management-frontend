"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { Icons } from "../ui/icons";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        if (item?.subMenus?.length)
          return <SubMenuItem key={index} {...{ menu: item, path, setOpen }} />;
        return (
          <MenuItem key={item?.title} {...{ menu: item, path, setOpen }} />
        );
      })}
    </nav>
  );
}

interface MenuItemProps {
  menu: NavItem;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  path?: string;
  disableIcon?: boolean;
}

const hasActiveMenu = (href: string, path?: string) => {
  if (href === "/dashboard") return href === path;
  return path?.includes(href);
};

const MenuItem = ({ menu, setOpen, path, disableIcon }: MenuItemProps) => {
  const Icon = Icons[menu?.icon || "arrowRight"];
  return (
    <Link
      key={menu.title}
      href={menu.disabled ? "/" : menu.href}
      onClick={() => {
        if (setOpen) setOpen(false);
      }}
    >
      <span
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          hasActiveMenu(menu?.href, path) ? "bg-accent" : "transparent",
          menu.disabled && "cursor-not-allowed opacity-80"
        )}
      >
        {!disableIcon && <Icon className="w-4 h-4 mr-2" />}
        <span>{menu.title}</span>
      </span>
    </Link>
  );
};

const SubMenuItem = ({ menu, setOpen, path }: MenuItemProps) => {
  const Icon = Icons[menu?.icon || "arrowRight"];

  return (
    <Accordion type="single" collapsible>
      <AccordionItem className="border-b-0 " value={menu?.href}>
        <AccordionTrigger
          className={cn(
            "flex items-center justify-start  px-3 py-2 text-sm font-medium transition-none rounded-md hover:no-underline text-start group hover:bg-accent hover:text-accent-foreground",
            {
              "data-[state=closed]:bg-accent": menu?.subMenus?.some((menu) =>
                hasActiveMenu(menu?.href, path)
              ),
            }
          )}
        >
          <Icon className="w-4 h-4 mr-2" /> {menu.title}
        </AccordionTrigger>
        <AccordionContent className="pb-0 pl-2 ml-6 border-l">
          {menu?.subMenus?.map((menu) => (
            <MenuItem
              disableIcon
              key={menu?.href}
              {...{ menu, setOpen, path }}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
