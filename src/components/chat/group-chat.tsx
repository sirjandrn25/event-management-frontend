import useQueryList from "@/hooks/core/useQueryList.hook";
import { ChatSchema } from "@/types/chat.type";
import { DictionaryType } from "@/types/common.type";
import { ArrayUtils } from "@/utils/array.utils";
import { useMemo, useState } from "react";
import AutoForm, { AutoFormSubmit } from "../autoForm/auto-form";
import { useAuthContext } from "../context/auth.provider";
import { FormLabel } from "../ui/form";
import { MultiSelectBox } from "../ui/selectBox/multi-select-box";
import { ParseToSelectBoxOption } from "../ui/selectBox/select-box.utils";
import { useChat } from "./hooks/use-chat.hook";

const GroupChat = ({
  callback,
}: {
  callback: (data: DictionaryType) => void;
}) => {
  const [search, setSearch] = useState<string>("");
  const [value, setValue] = useState<string[]>([]);
  const { onSubmit, isSubmitting } = useChat({ callback });
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const { isAuthorId } = useAuthContext();
  const { data } = useQueryList({
    endPoint: "users/search",
    disableNetwork: search?.length < 3,
    method: "search",
    searchParams: {
      search: search,
    },
  });
  const users = data?.filter(
    (data: any) => !isAuthorId(data?.id)
  ) as DictionaryType[];

  const options = useMemo(() => {
    const options = [
      ...ParseToSelectBoxOption({
        data: users ?? [],
        valueKey: "id",
        labelKey: "name",
        subLabelKey: "email",
      }),
      ...selectedUsers,
    ];
    return ArrayUtils.getUniqueArray(options, "value") as any;
  }, [selectedUsers, users]);

  return (
    <AutoForm
      onSubmit={(values) => {
        onSubmit({
          ...values,
          is_group: true,
          user_ids: value,
        });
      }}
      formSchema={ChatSchema.omit({ user_ids: true, is_group: true })}
    >
      <div className="grid gap-1">
        <FormLabel>Users</FormLabel>
        <MultiSelectBox
          className="w-full"
          searchValue={search}
          onSearchValue={(value) => setSearch(value ?? "")}
          value={value}
          displayLimit={4}
          onChange={(value) => setValue((value as string[]) ?? [])}
          onOptionChange={(options) => setSelectedUsers(options ?? [])}
          options={options}
          placeholder="Select users..."
        />
      </div>
      <div className="flex justify-end">
        <AutoFormSubmit disabled={value?.length < 1} isLoading={isSubmitting}>
          Create New Chat
        </AutoFormSubmit>
      </div>
    </AutoForm>
  );
};

export default GroupChat;
