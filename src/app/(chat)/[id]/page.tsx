"use client";
import ChatDetailHeader from "@/components/chat/chat-detail-header";
import MessageContainer from "@/components/chat/message-container";
import MessageSubmit from "@/components/chat/message-submit";
import useQueryDetail from "@/hooks/core/useQueryDetail.hook";
import { DictionaryType } from "@/types/common.type";
import { useParams } from "next/navigation";

const ChatDetailPage = () => {
  const params = useParams();
  const { data } = useQueryDetail({
    endPoint: `chats/${params?.id}`,
  });
  return (
    <div className="flex flex-col">
      <ChatDetailHeader chat={data as DictionaryType} />
      <MessageContainer />
      <MessageSubmit />
    </div>
  );
};

export default ChatDetailPage;
