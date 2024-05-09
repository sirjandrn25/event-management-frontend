"use client";
import { cn } from "@/lib/utils";
import { DictionaryType } from "@/types/common.type";
import { useAuthContext } from "../context/auth.provider";
import { Icons } from "../ui/icons";
import useChatMessage from "./hooks/use-chat-message.hook";

const MessageContainer = () => {
  const { messages, isLoading, messageRef } = useChatMessage();
  const { isAuthorId } = useAuthContext();

  return (
    <div
      ref={messageRef}
      className="h-[calc(100vh-120px)] p-4  w-full  overflow-y-auto "
    >
      <div className="  flex-col-reverse gap-4 flex  ">
        {!isLoading &&
          messages?.map((message) => (
            <MessageBubble
              key={message?.id}
              message={message}
              isAuthor={isAuthorId(message?.user_id)}
            />
          ))}
        {isLoading && <Icons.spinner />}
      </div>
    </div>
  );
};

const MessageBubble = ({
  message,
  isAuthor,
}: {
  message?: DictionaryType;
  isAuthor?: boolean;
}) => {
  const time = new Date(message?.created_at).toLocaleTimeString();
  return (
    <div
      className={cn("grid gap-1 w-auto border rounded-lg p-2  ", {
        "mr-10": !isAuthor,
        "ml-10": isAuthor,
        "bg-muted text-muted-foreground": isAuthor,
      })}
    >
      <div className="text-xs font-medium text-orange-500 ">
        {message?.user?.name}
      </div>
      <div className=" justify-between flex text-sm ">
        <div className="text-sm">{message?.message}</div>
        <div className="mt-1 text-xs text-muted-foreground ">{time}</div>
      </div>
    </div>
  );
};

export default MessageContainer;
