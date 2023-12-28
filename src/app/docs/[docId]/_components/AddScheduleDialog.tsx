import { useRef } from "react";

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
import { auth } from "@/lib/auth";


type Props = {
    setName: (name) => void;
    setLoca:(lo: string[]) => void;
};

async function AddScheduleDialog({setName, setLoca}: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;
  //   const userId = session.user.id;
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const name = nameInputRef.current?.value;
    const nameStr = name?.toString();

    if(name !== undefined)
        setName((prev:string[]) => [...prev, nameStr]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2" variant={"outlined"}>Members</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Schedule</DialogTitle>
          <DialogDescription>Give this location a name !</DialogDescription>
        </DialogHeader>

        <Input 
        placeholder="Give it a name !" 
        ref={nameInputRef} 
        />
        <Button
            onClick={handleSave}
        >Add</Button>

      </DialogContent>
    </Dialog>
  );
}

export default AddScheduleDialog;
