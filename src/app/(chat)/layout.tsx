"use client";
import ChatList from "@/components/chat/chat-list";
import ChatListHeader from "@/components/chat/chat-list-header";
import ChatMenu from "@/components/chat/chat-menu";
import { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted lg:block ">
        <div className="grid grid-cols-5 h-screen">
          <ChatMenu />
          <div className="flex h-full  col-span-4 max-h-screen  flex-col gap-2">
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
