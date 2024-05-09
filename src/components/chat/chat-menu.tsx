import Link from "next/link";
import { useAuthContext } from "../context/auth.provider";
import { Button, buttonVariants } from "../ui/button";
import { Icons } from "../ui/icons";

const ChatMenu = () => {
  const { handleLogout } = useAuthContext();
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
        <Link
          className={buttonVariants({
            size: "icon",
            variant: "ghost",
          })}
          href="/"
        >
          <Icons.users />
        </Link>
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
