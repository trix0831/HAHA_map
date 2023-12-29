"use client";

// import { redirect } from "next/navigation";
// import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { AiFillDelete } from "react-icons/ai";

type inputType = {
  content: string[];
  senderId: string[];
  senderName: string[];
  setContent: (content: string[], senderId: string[], senderName: string[]) => void;
}

function ChatRoomMessages({content, senderId, senderName, setContent}: inputType) {
  const {data:session} = useSession();
  const user = session?.user?.id;

  const handleDelete = (index: number) => {
    console.log("delete");
    const temp1 = [...content.slice(0, index), ...content.slice(index+1, content.length)];
    const temp2 = [...senderId.slice(0, index), ...senderId.slice(index+1, senderId.length)];
    const temp3 = [...senderName.slice(0, index), ...senderName.slice(index+1, senderName.length)];
    console.log(temp1);
    console.log(temp2);
    setContent(temp1, temp2, temp3);
  }

  return (
    <div className="px-2 pt-4">
      {
        Array.isArray(content)?(
            content.map((each, index) => {
            const isSender = senderId[index] === user;
            return (
              <div key={index} className="w-full pt-1">
                <div
                  className={`flex flex-row items-end gap-2 ${
                    isSender && "justify-end"
                  }`}
                >
                  {!isSender && (
                    <>
                        <p>{senderName[index]}</p>
                        <Avatar
                        displayId={senderId[index]}
                        classname="bg-black text-white w-8 h-8"
                        />
                    </>
                  )}
                  {isSender && (
                      <button className="text-gray-400" onClick={() => handleDelete(index)}>
                        <AiFillDelete size={16} />
                      </button>
                  )}
                  <div
                    className={`max-w-[60%] rounded-2xl px-3 py-1 leading-6 ${
                      isSender ? "bg-black text-white" : " bg-gray-200 text-black"
                    }`}
                  >
                    {each}
                  </div>
                </div>
              </div>
            );
          })
        ):<></>
      }
      
    </div>
  );
}

export default ChatRoomMessages;