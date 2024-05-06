import ChatList from "@/components/chat/chat-list";
import ChatListHeader from "@/components/chat/chat-list-header";
import { ReactNode } from "react";

const ChatLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted lg:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <ChatListHeader />
          <ChatList />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChatLayout;
