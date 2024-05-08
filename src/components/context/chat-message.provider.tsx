"use client";
import { NEW_MESSAGE } from "@/constants/chat.constant";
import { socket } from "@/constants/socket.constant";
import useQueryList from "@/hooks/core/useQueryList.hook";
import { DictionaryType } from "@/types/common.type";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthContext } from "./auth.provider";

type ChatMessageContextType = {
  messages: DictionaryType[];
  onSendMessage: (message: string) => void;
  refetch: () => void;
  isLoading?: boolean;
};

export const ChatMessageContext = createContext<ChatMessageContextType>({
  messages: [],
  onSendMessage: () => {},
  refetch: () => {},
});
const ChatMessageProvider = ({
  children,
  chatId,
}: {
  children: ReactNode;
  chatId: string;
}) => {
  const [newMessage, setNewMessage] = useState<DictionaryType>();
  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useQueryList({
    endPoint: `chats/${chatId}/messages`,
  });

  useEffect(() => {
    socket.on(chatId, (data) => {
      setNewMessage(undefined);
      refetch();
    });
  }, [chatId, refetch]);
  const { user } = useAuthContext();
  const onSendMessage = useCallback(
    (message: string) => {
      try {
        socket.emit(NEW_MESSAGE, {
          message: message,
          chat_id: chatId,
          user_id: user?.id,
        });
        setNewMessage({
          id: new Date().toDateString(),
          message: message,
          chat_id: chatId,
          user_id: user?.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user: user,
        });
      } catch (error) {
        console.log("error message", error);
      }
    },
    [chatId, user]
  );
  const value = useMemo(
    () => ({
      messages: newMessage
        ? [...((messages as DictionaryType[]) ?? []), newMessage]
        : (messages as DictionaryType[]),
      isLoading,
      onSendMessage,
      refetch,
    }),
    [isLoading, messages, newMessage, onSendMessage, refetch]
  );
  return (
    <ChatMessageContext.Provider value={value}>
      {children}
    </ChatMessageContext.Provider>
  );
};
export const useChatMessageContext = () => {
  return useContext(ChatMessageContext);
};
export default ChatMessageProvider;
