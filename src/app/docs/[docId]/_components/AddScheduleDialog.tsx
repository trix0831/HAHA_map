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
    save: (name:string[], location:string[]) => Promise<void>;
    schLoca: string[];
    schName: string[];
};

function AddScheduleDialog({setName, setSchLoca, location, save, schLoca, schName}: Props) {
  const nameInputRef = useRef<HTMLInputElement>(null);

  async function handleSave (){
    const name = nameInputRef.current?.value;
    const nameStr = name?.toString();

    let b:string[] = [];
    if(name !== undefined){
        await setName((prev:string[]) => [...prev, nameStr]);
        b = [...schName, nameStr!];
        // alert(nameStr);
    }
    
    if(location !== undefined){
        // alert("location array");
        // alert([...schLoca, location]);
        // setSchLoca((prev:string[]) => [...prev, location]);
        await setSchLoca([...schLoca, location])
        // alert(location);
    }
    const a = [...schLoca, location];
    
    // alert(schLoca);
    // alert("I'm gonna save!!1");
    
    await save(b,a);
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
