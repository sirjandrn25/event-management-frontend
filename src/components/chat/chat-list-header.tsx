"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button } from "../ui/button";
import { ModalDialog } from "../ui/modal-dialog";
import GroupChat from "./group-chat";

const ChatListHeader = () => {
  const modalRef = useRef<any>(null);
  const router = useRouter();
  return (
    <div className="flex h-[60px] w-full items-center justify-between border-b px-6">
      <span className="font-medium">Chat </span>
      <ModalDialog
        trigger={
          <Button size={"sm"} variant={"outline"}>
            + Group Chat
          </Button>
        }
        ref={modalRef}
        title="Group Chat"
      >
        <GroupChat
          callback={(data) => {
            modalRef.current?.onClose();
            router.push(`/${data?.id}`);
          }}
        />
      </ModalDialog>
    </div>
  );
};

export default ChatListHeader;
