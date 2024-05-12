import ChatList from "./chat-list";
import ChatListHeader from "./chat-list-header";
import ChatMenu from "./chat-menu";

const ChatMenuContainer = () => {
  return (
    <div className="hidden border-r bg-muted lg:block ">
      <div className="grid grid-cols-5 h-screen">
        <ChatMenu />
        <div className="flex h-full  col-span-4 max-h-screen  flex-col gap-2">
          <ChatListHeader />
          <ChatList />
        </div>
      </div>
    </div>
  );
};

export default ChatMenuContainer;
