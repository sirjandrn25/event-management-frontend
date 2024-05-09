"use client";
import { cn } from "@/lib/utils";
import { DictionaryType } from "@/types/common.type";
import { CommonUtils } from "@/utils/common.utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useChatContext } from "../context/chat.provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatList = () => {
  const params = useParams();
  const { chats } = useChatContext();

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start  text-sm font-medium">
        {chats.map((item) => (
          <ChatListItem
            isActive={item?.id === params?.id}
            key={item?.id}
            chat={item}
          />
        ))}
      </nav>
    </div>
  );
};

const ChatListItem = ({
  chat,
  isActive,
}: {
  chat: DictionaryType;
  isActive?: boolean;
}) => {
  console.log({ chat });
  return (
    <Link
      className={cn(
        "flex items-center w-full hover:text-blue-500 gap-3  border-b  px-3 py-2  transition-all    ",
        isActive && "border-blue-500 text-blue-500"
      )}
      href={`${chat?.id}`}
    >
      <Avatar className="border">
        <AvatarImage alt="@shadcn" src={chat?.user?.image} />
        <AvatarFallback>
          {CommonUtils.getInitialsFromText(
            chat?.is_group ? chat?.title : chat?.user?.name ?? ""
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium">
          {chat?.is_group ? chat?.title : chat?.user?.name}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {`Hey, how's it going?`}
        </div>
      </div>
      <div className="text-xs text-muted-foreground ">2:30 PM</div>
    </Link>
  );
};

export default ChatList;
