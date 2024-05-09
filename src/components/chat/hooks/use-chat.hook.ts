import { useChatContext } from "@/components/context/chat.provider";
import { toast } from "@/hooks/core/use-toast";
import useCustomMutation from "@/hooks/core/useCustomMutation.hook";
import { ChatSchema } from "@/types/chat.type";
import { DictionaryType } from "@/types/common.type";

export const useChat = ({
  callback,
}: {
  callback: (data: DictionaryType) => void;
}) => {
  const { refetch } = useChatContext();
  const { onSubmit, isPending: isSubmitting } = useCustomMutation({
    endPoint: "chats",
    schema: ChatSchema,
    onSuccess: (data: DictionaryType) => {
      callback(data);
      refetch();
      toast({
        title: "Chat User",
        description: "Chat user successfully",
      });
    },
  });

  return {
    onSubmit,
    isSubmitting,
  };
};
