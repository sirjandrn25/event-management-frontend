"use client";
import ChatList from "@/components/chat/chat-list";
import ChatListHeader from "@/components/chat/chat-list-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted lg:block ">
        <div className="grid grid-cols-5 h-screen">
          <div className="border-r grid gap-4 items-start bg-white  py-4  ">
            <div className="mx-auto flex flex-col gap-4 text-muted-foreground">
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                  className: "bg-gray-200 ",
                })}
                href="/"
              >
                <Icons.messageCircle />
              </Link>
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
                href="/"
              >
                <Icons.users />
              </Link>
              <Link
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
                href="/"
              >
                <Icons.settings />
              </Link>
              <Button variant={"ghost"} size={"icon"}>
                <Icons.logout />
              </Button>
            </div>
          </div>
          <div className="flex h-full col-span-4 max-h-screen flex-1 flex-col gap-2">
            <ChatListHeader />
            <ChatList />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;
