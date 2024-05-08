"use client";
import { useChatMessageContext } from "@/components/context/chat-message.provider";
import { useEffect, useRef } from "react";

const useChatMessage = () => {
  const messageRef = useRef<any>(null);
  const { messages, isLoading } = useChatMessageContext();
  const makeScrollToDown = () => {
    const target: any = messageRef?.current;

    if (!target) return;

    target?.scroll({
      top: target?.scrollHeight,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    makeScrollToDown();
  }, [messages]);

  return {
    messageRef,
    messages,
    isLoading,
  };
};

export default useChatMessage;
