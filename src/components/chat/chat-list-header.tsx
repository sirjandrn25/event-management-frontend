import { BellIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
const ChatListHeader = () => {
  return (
    <div className="flex h-[60px] items-center border-b px-6">
      <Link className="flex items-center gap-2 font-semibold" href="#">
        <MessageCircleIcon className="h-6 w-6" />
        <span className="">Chat App</span>
      </Link>
      <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
        <BellIcon className="h-4 w-4" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
    </div>
  );
};

export default ChatListHeader;
