"use client";
import ChatDetailHeader from "@/components/chat/chat-detail-header";
import MessageContainer from "@/components/chat/message-container";
import MessageSubmit from "@/components/chat/message-submit";
import ChatMessageProvider from "@/components/context/chat-message.provider";
import useQueryDetail from "@/hooks/core/useQueryDetail.hook";
import { DictionaryType } from "@/types/common.type";
import { useParams } from "next/navigation";

const ChatDetailPage = () => {
  const params = useParams();
  const chatId = params?.id || "";
  const { data } = useQueryDetail({
    endPoint: `chats/${chatId}`,
  });
  return (
    <div className="flex flex-col h-full">
      <ChatMessageProvider chatId={chatId as string}>
        <ChatDetailHeader chat={data as DictionaryType} />
        <MessageContainer />
        <MessageSubmit />
      </ChatMessageProvider>
    </div>
  );
};

export default ChatDetailPage;
