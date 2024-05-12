"use client";
import { useAuthContext } from "./context/auth.provider";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { ModalDialog } from "./ui/modal-dialog";

const ProfileModal = () => {
  const { user } = useAuthContext();
  return (
    <ModalDialog
      trigger={
        <Button variant={"ghost"} size={"icon"}>
          <Icons.circlePerson />
        </Button>
      }
    >
      <div className="flex flex-col gap-6 justify-center items-center w-full h-full">
        <div className="grid gap-1">
          <Icons.circlePerson className="h-20 w-20" />
          <div className="px-6 rounded text-sm hover:cursor-pointer hover:shadow-lg bg-muted text-muted-foreground">
            Change
          </div>
        </div>
        <div className="grid text-center gap-1">
          <div className="font-bold capitalize text-xl">{user?.name}</div>
          <div className="text-sm">{user?.email}</div>
        </div>
      </div>
    </ModalDialog>
  );
};

export default ProfileModal;
