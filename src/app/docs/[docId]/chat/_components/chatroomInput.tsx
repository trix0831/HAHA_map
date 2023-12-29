"use client";

// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";

type inputType = {
  content: string[];
  senderName: string[];
  setContent: (content: string[], senderId: string[], senderName: string[])=>void;
  senderId: string[];
}

function ChatRoomInput({content, senderName, setContent, senderId }: inputType) {
  // const url = usePathname();
  // const docId = (url.split('/').pop())!;
  const {data:session} = useSession();
  const user = session?.user?.id;
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const getUsername = async() => {
        const res = await fetch(`/api/username/${user}`);
        if (!res.ok) {
            console.log("can't find user!!!");
        return;
        }
        const temp = await res.json();
        setName(temp.username);
    }
    getUsername();
}, [user])
  
  // const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/doc");
  //     return;
  //   }
  // }, [user, router]);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("submit");
    if (!input) return;
    if (!user) return;

    console.log(input);
    console.log(user);
    const temp1 = [...content, input];
    const temp2 = [...senderId, user];
    const temp3 = [...senderName, name];
    setContent(temp1, temp2, temp3);
    console.log(temp1);
    console.log(temp2);
    console.log(temp3);
    // router.refresh();
    setInput("");
  };
  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Aa"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out"
      />
      <button
        type="submit"
        className="bg-black text-white py-1 px-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200 ease-in-out"
      >
        Send
      </button>
    </form>
  );
}

export default ChatRoomInput;