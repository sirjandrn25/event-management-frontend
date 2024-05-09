"use client";
import useQueryList from "@/hooks/core/useQueryList.hook";
import { cn } from "@/lib/utils";
import { DictionaryType } from "@/types/common.type";
import { useState } from "react";
import { useAuthContext } from "../context/auth.provider";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { useChat } from "./hooks/use-chat.hook";

const ChatUsersSearch = ({
  callback,
}: {
  callback: (data: DictionaryType) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const { isAuthorId } = useAuthContext();

  const { data, isLoading } = useQueryList({
    endPoint: "users/search",
    disableNetwork: search?.length < 3,
    method: "search",
    searchParams: {
      search: search,
    },
  });
  const { isSubmitting, onSubmit } = useChat({
    callback,
  });

  return (
    <div className="grid gap-4">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value ?? "");
        }}
        placeholder="Search Friends (min: 3 characters)"
        disabled={isSubmitting}
      />
      <div className="grid gap-2">
        {isLoading && (
          <div className="p-6 flex w-full gap-2 justify-center">
            <Icons.spinner className="h-6 w-6" /> <span>Searching ...</span>
          </div>
        )}
        {!isLoading &&
          data
            ?.filter((data: any) => !isAuthorId(data?.id))
            ?.map((user: any) => (
              <div
                key={user?.id}
                className={cn(
                  "grid rounded p-2 bg-muted hover:shadow-lg border cursor-pointer",
                  {
                    "cursor-wait": isSubmitting,
                  }
                )}
                onClick={() =>
                  onSubmit({
                    user_ids: [user.id],
                  })
                }
              >
                <div className="font-medium text-sm">{user?.name}</div>
                <div className="font-medium text-xs  text-muted-foreground">
                  {user?.email}
                </div>
              </div>
            ))}
        {isSubmitting && (
          <div className="text-center text-muted-foreground">Submitting...</div>
        )}
      </div>
    </div>
  );
};

export default ChatUsersSearch;
