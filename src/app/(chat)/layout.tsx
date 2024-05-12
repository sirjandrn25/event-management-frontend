"use client";
import ChatMenuContainer from "@/components/chat/chat-menu-container";
import ChatProvider from "@/components/context/chat.provider";
import { ReactNode, useState } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <ChatProvider>
      <div className="grid h-screen w-full relative lg:grid-cols-[300px_1fr]">
        <ChatMenuContainer />
        {children}
      </div>
    </ChatProvider>
  );
};

export default ChatLayout;
