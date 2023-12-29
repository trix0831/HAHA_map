"use client"

import { Button } from "@mui/material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useActivity } from "@/hooks/useActivity";
import type { memberType } from "@/lib/types/db";
import { useRef } from "react";

type Props = {
  docId: string;
  membersState: memberType[];
};


function ShareDialog({ docId, membersState }: Props) {

  const {setMem, addMem} = useActivity();
  const friendNameRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(){
    const friendName = friendNameRef.current?.value;

    

    // if(friendName){
    //   const newMember = await addMem(docId);
    //   setMem([...membersState, newMember]);
    // }
  }


  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button className="text-sm" variant={"outlined"}>Members</Button>
      </DialogTrigger>

      <DialogContent>

        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Add another member to this trip !</DialogDescription>
        </DialogHeader>

        <Input placeholder="Friend email" name="friendEmail" />
        <Button type="submit">Add</Button>

        <div className="flex w-full flex-col gap-1">
          <h1 className="w-full font-semibold text-slate-900">Members</h1>
          {membersState.map((member, index) => (
            <form key={index} className="flex w-full items-center gap-2">
              <svg width="30" height="30" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512 661.3c-117.6 0-213.3-95.7-213.3-213.3S394.4 234.7 512 234.7 725.3 330.4 725.3 448 629.6 661.3 512 661.3z m0-341.3c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128z" fill="#5F6379" />
                  <path d="M837 862.9c-15.7 0-30.8-8.7-38.2-23.7C744.3 729.5 634.4 661.3 512 661.3s-232.3 68.1-286.8 177.9c-10.5 21.1-36.1 29.7-57.2 19.2s-29.7-36.1-19.2-57.2C217.8 662.3 357 576 512 576s294.2 86.3 363.2 225.2c10.5 21.1 1.9 46.7-19.2 57.2-6.1 3-12.6 4.5-19 4.5z" fill="#5F6379" />
                  <path d="M512 1002.7c-270.6 0-490.7-220.1-490.7-490.7S241.4 21.3 512 21.3s490.7 220.1 490.7 490.7-220.1 490.7-490.7 490.7z m0-896c-223.5 0-405.3 181.8-405.3 405.3S288.5 917.3 512 917.3 917.3 735.5 917.3 512 735.5 106.7 512 106.7z" fill="#3688FF" />
              </svg>

              <div className="flex grow flex-col ">
                <h2 className="text-sm font-semibold">{member.username}</h2>
                <p className="text-xs text-gray-600">{member.email}</p>
              </div>
            </form>
          ))}
        </div>
      </DialogContent>

    </Dialog>
  );
}

export default ShareDialog;
