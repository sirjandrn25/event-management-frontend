"use client";

import { useAuthContext } from "../context/auth.provider";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
const ChatListHeader = () => {
  const { handleLogout } = useAuthContext();
  return (
    <div className="flex h-[60px] items-center border-b px-6">
      <span className="font-medium">Chit Chat App</span>

      <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
        <Icons.logout onClick={handleLogout} className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
  );
};

export default ChatListHeader;
