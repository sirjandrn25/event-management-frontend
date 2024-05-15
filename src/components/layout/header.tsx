"use client";
import {} from "date-fns";
import Link from "next/link";
import { UserNav } from "./user-nav";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 border-b supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur">
      <nav className="flex items-center justify-between px-4 h-14">
        <div className="hidden lg:block">
          <Link
            href={"/"}
            target="_blank"
            className="flex items-center gap-1 text-purple-500"
          >
            <>
              <span className="text-xl font-bold ">Scheduler App</span>
            </>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </div>
  );
}
