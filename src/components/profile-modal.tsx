"use client";
import { useFileUpload } from "@/hooks/core/use-file-upload.hook";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { cn } from "@/lib/utils";
import { CommonUtils } from "@/utils/common.utils";
import { useMemo } from "react";
import { z } from "zod";
import { useAuthContext } from "./context/auth.provider";
import { FileUploader } from "./fileUploader/file-uploader";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Icons } from "./ui/icons";
import { ModalDialog } from "./ui/modal-dialog";

const FormSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
});
const ProfileModal = () => {
  const { user, fetchUser } = useAuthContext();
  const { isUploading, onUpload: onUploadFile } = useFileUpload();
  const { onSubmit, isPending } = useCustomMutation({
    endPoint: "auth/update-profile",
    schema: FormSchema,
    onSuccess: (data: any) => {
      toast({
        title: "Profile updated",
        description: "Profile updated successfully",
      });
      fetchUser?.();
    },
  });
  const isSubmitting = useMemo(
    () => isPending ?? isUploading,
    [isPending, isUploading]
  );
  return (
    <ModalDialog
      trigger={
        <Button variant={"ghost"} size={"icon"}>
          {!user?.image && <Icons.circlePerson />}
          {!!user?.image && (
            <Avatar className="border">
              <AvatarImage alt="avatar" src={user?.image} />
              <AvatarFallback>
                {CommonUtils.getInitialsFromText(user?.name ?? "")}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      }
    >
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <div className="font-bold capitalize text-3xl">{user?.name}</div>
        <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
          {!user?.image && <Icons.circlePerson className="h-24 w-24" />}
          {!!user?.image && (
            <img src={user?.image} className="h-24 border w-24 rounded-full" />
          )}

          <FileUploader
            onDropFile={async (fileObjects) => {
              const files = await onUploadFile(fileObjects);
              onSubmit({
                image: files[0]?.url,
              });
            }}
            disabled={isSubmitting}
            accept={{ "image/jpeg": [], "image/png": [] }}
          >
            {isSubmitting ? (
              <div className="text-muted-foreground text-sm">Uploading ...</div>
            ) : (
              <div
                className={cn(
                  "px-6 rounded text-sm hover:cursor-pointer text-orange-500 hover:shadow-lg border font-bold text-muted-foreground"
                )}
              >
                Change
              </div>
            )}
          </FileUploader>
        </div>
        <div className="flex gap-1 items-center text-sm">
          <div className="text-muted-foreground font-bold">Email</div>:{" "}
          <div className="text-sm">{user?.email}</div>
        </div>
      </div>
    </ModalDialog>
  );
};

export default ProfileModal;
