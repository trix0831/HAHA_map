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


type Props = {
    setName: (name) => void;
    setSchLoca:(lo:string[]) => void;
    location: string;
    save: () => void;
    schLoca: string[];
};

function AddScheduleDialog({setName, setSchLoca, location, save, schLoca}: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  async function handleSave (){
    const name = nameInputRef.current?.value;
    const nameStr = name?.toString();

    if(name !== undefined){
        await setName((prev:string[]) => [...prev, nameStr]);
        // alert(nameStr);
        save();
    }
    
    if(location !== undefined){
        // alert("location array");
        // alert([...schLoca, location]);
        // setSchLoca((prev:string[]) => [...prev, location]);
        await setSchLoca([...schLoca, location])
        save();
        // alert(location);
    }
    // alert(schLoca);
    // alert("I'm gonna save!!1");
    
    save();
    save();
    save();
    save();
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-2 text-sm" variant={"outlined"} sx={{ whiteSpace: 'nowrap', width: '120px' }}>Add Schedule</Button>
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
        >
            Add
        </Button>

      </DialogContent>
    </Dialog>
  );
}

export default AddScheduleDialog;
