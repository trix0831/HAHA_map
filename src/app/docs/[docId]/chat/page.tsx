"use client";

import { useDocument } from "@/hooks/useDocument";
import ChatRoomInput from "./_components/chatroomInput";
import ChatRoomMessages from "./_components/chatroommessage";

function ChatPage() {
  const { content, setContent, senderId, senderName } = useDocument();
  return (
    <div className="w-full">
      <div className="w-full h-full overflow-hidden flex flex-col">
        <nav className="w-full shadow-md p-3 text-md font-semibold">Chatroom</nav>
        <div className="overflow-y-scroll grow">
          <ChatRoomMessages
            content={content}
            senderId={senderId}
            senderName={senderName}
            setContent={setContent}
          />
        </div>
        <div className="p-2 flex-1 fixed bottom-0 right-0 ">
          <ChatRoomInput 
            content={content}
            senderName={senderName}
            setContent={setContent}
            senderId={senderId}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
