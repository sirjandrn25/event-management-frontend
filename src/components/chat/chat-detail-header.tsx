"use client";
import { DictionaryType } from "@/types/common.type";
import { CommonUtils } from "@/utils/common.utils";
import { useMemo } from "react";
import { useAuthContext } from "../context/auth.provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ChatDetailHeader = ({ chat }: { chat: DictionaryType }) => {
  const { isAuthorId, user: authUser } = useAuthContext();
  const user = chat?.chat_users?.filter((el: DictionaryType) =>
    isAuthorId(el?.user_id)
  )[0]?.user;
  const { title = "", subTitle } = useMemo(() => {
    return {
      title: chat?.is_group ? chat?.title : user?.name,
      subTitle: "Online",
    };
  }, [chat?.is_group, chat?.title, user?.name]);
  return (
    <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted px-6 ">
      <div className="flex items-center gap-4">
        <Avatar className="border">
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>
            {CommonUtils.getInitialsFromText(title)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground ">{subTitle}</div>
        </div>
      </div>
      <div className="ml-auto flex gap-2">
        {/* <Button className="rounded-full" size="icon" variant="ghost">
          <PhoneIcon className="h-5 w-5" />
          <span className="sr-only">Call</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <VideoIcon className="h-5 w-5" />
          <span className="sr-only">Video call</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <MoveHorizontalIcon className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button> */}
        <Avatar className="border">
          <AvatarImage alt={authUser?.name} src={authUser?.image} />
          <AvatarFallback>
            {CommonUtils.getInitialsFromText(authUser?.name ?? "")}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ChatDetailHeader;
