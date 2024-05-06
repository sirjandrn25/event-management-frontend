import { cn } from "@/lib/utils";
import { DictionaryType } from "@/types/common.type";

const MessageContainer = () => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="grid gap-4">
        <UserMessage />
      </div>
    </div>
  );
};

const UserMessage = ({ message }: { message?: DictionaryType }) => {
  return (
    <div
      className={cn("grid gap-1 w-auto border rounded-lg p-2  ", {
        "mr-10": false,
        "ml-10": true,
      })}
    >
      <div className="text-xs font-medium text-orange-500 ">Sirjan Tamang</div>
      <div className=" justify-between flex text-sm ">
        <div className="text-sm">Did you get the files I sent?</div>
        <div className="mt-1 text-xs text-muted-foreground ">2:32 PM</div>
      </div>
    </div>
  );
};

export default MessageContainer;
