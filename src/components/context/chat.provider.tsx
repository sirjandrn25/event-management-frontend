"use client";
import useQueryList from "@/hooks/core/useQueryList.hook";
import { DictionaryType } from "@/types/common.type";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAuthContext } from "./auth.provider";

type ChatContextType = {
  chats: DictionaryType[];
  refetch: () => void;
  isLoading?: boolean;
};

export const ChatMessageContext = createContext<ChatContextType>({
  chats: [],
  refetch: () => {},
});
const ChatProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: chats = [],
    isLoading,
    refetch,
  } = useQueryList<any>({
    endPoint: "chats",
  });
  const { isAuthorId } = useAuthContext();
  const filteredChats = useMemo(
    () =>
      chats
        .map((chat) => {
          return {
            ...chat,
            user: chat?.chat_users?.filter(
              (el: DictionaryType) => !isAuthorId(el?.user_id)
            )[0]?.user,
          };
        })
        .filter((chat) => !!chat?.user),
    [chats, isAuthorId]
  );
  console.log({ filteredChats });

  const value = useMemo(
    () => ({
      chats: filteredChats,
      refetch,
      isLoading,
      isSubmitting: false,
    }),
    [filteredChats, isLoading, refetch]
  );
  return (
    <ChatMessageContext.Provider value={value}>
      {children}
    </ChatMessageContext.Provider>
  );
};
export const useChatContext = () => {
  return useContext(ChatMessageContext);
};

export default ChatProvider;
