import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useAuthContext } from "../context/auth.provider";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";
import { SlidePane } from "../ui/slide-pane";
import ChatUsersSearch from "./chat-users-search";

const ChatMenu = () => {
  const { handleLogout } = useAuthContext();
  const router = useRouter();
  const modalRef = useRef<any>(null);
  return (
    <div className="border-r grid gap-4 items-start bg-white  py-4  ">
      <div className="mx-auto flex flex-col gap-4 text-muted-foreground">
        <Link
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
            className: "bg-gray-200 ",
          })}
          href="/"
        >
          <Icons.messageCircle />
        </Link>

        <SlidePane
          title="Add New Users"
          ref={modalRef}
          trigger={
            <Button variant={"ghost"} size={"icon"}>
              <Icons.users />
            </Button>
          }
        >
          <ChatUsersSearch
            callback={(data) => {
              modalRef?.current?.onClose();
              router.push(`/${data.id}`);
            }}
          />
        </SlidePane>

        <Link
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
          href="/"
        >
          <Icons.settings />
        </Link>
        <Button variant={"ghost"} size={"icon"}>
          <Icons.logout onClick={handleLogout} />
        </Button>
      </div>
    </div>
  );
};

export default ChatMenu;
