"use client";
import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import { useState } from "react";
import { useChatMessageContext } from "../context/chat-message.provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageSubmit = () => {
  const { onSendMessage } = useChatMessageContext();
  const [message, setMessage] = useState<string>("");
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!message) return;
        onSendMessage(message);
        setMessage("");
      }}
    >
      <div className="flex h-[60px] items-center gap-4 border-t bg-muted px-6 ">
        <Input
          className="flex-1 bg-transparent"
          placeholder="Type your message..."
          type="text"
          value={message}
          required
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <Button className="rounded-full" size="icon" variant="ghost">
          <PaperclipIcon className="h-5 w-5" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <SmileIcon className="h-5 w-5" />
          <span className="sr-only">Add emoji</span>
        </Button>
        <Button
          onClick={(e) => {
            if (!message) return;
            onSendMessage(message);
            setMessage("");
          }}
          className="rounded-full"
          size="icon"
          variant="ghost"
        >
          <SendIcon className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </form>
  );
};

export default MessageSubmit;
