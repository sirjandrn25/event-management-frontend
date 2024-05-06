import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MessageSubmit = () => {
  return (
    <div className="flex h-[60px] items-center gap-4 border-t bg-muted px-6 ">
      <Input
        className="flex-1 bg-transparent"
        placeholder="Type your message..."
        type="text"
      />
      <Button className="rounded-full" size="icon" variant="ghost">
        <PaperclipIcon className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>
      <Button className="rounded-full" size="icon" variant="ghost">
        <SmileIcon className="h-5 w-5" />
        <span className="sr-only">Add emoji</span>
      </Button>
      <Button className="rounded-full" size="icon" variant="ghost">
        <SendIcon className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};

export default MessageSubmit;
