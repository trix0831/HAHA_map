import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    setName: (name) => void;
    setSchLoca:(lo:string[]) => void;
    location: string;
    save: (name:string[], location:string[]) => Promise<void>;
    schLoca: string[];
    schName: string[];
};

function AddScheduleDialog({}:Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddScheduleDialog;


// import { useRef, useState } from "react";

// import { Button } from "@mui/material";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";


// type Props = {
//     setName: (name) => void;
//     setSchLoca:(lo:string[]) => void;
//     location: string;
//     save: () => void;
//     schLoca: string[];
// };

// function AddScheduleDialog({setName, setSchLoca, location, save, schLoca}: Props) {
//   const nameInputRef = useRef<HTMLInputElement>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   async function handleSave (){
//     toggleOpen();
//     const name = nameInputRef.current?.value;
//     const nameStr = name?.toString();

//     if(name !== undefined){
//         await setName((prev:string[]) => [...prev, nameStr]);
//         // alert(nameStr);
//         save();
//     }
    
//     if(location !== undefined){
//         // alert("location array");
//         // alert([...schLoca, location]);
//         // setSchLoca((prev:string[]) => [...prev, location]);
//         await setSchLoca([...schLoca, location])
//         save();
//         // alert(location);
//     }
//     // alert(schLoca);
//     // alert("I'm gonna save!!1");
    
//     save();
//     save();
//     save();
//     save();
// };

//   function toggleOpen() {
//     setDialogOpen((prev) => !prev);
//   }

//   return (
//     <Dialog open={dialogOpen}>
//       <DialogTrigger asChild>
//         <Button 
//           className="mr-2 text-sm" 
//           variant={"outlined"} 
//           sx={{ whiteSpace: 'nowrap', width: '120px' }}
//           onClick={toggleOpen}
//         >
//           Add Schedule
//         </Button>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Schedule</DialogTitle>
//           <DialogDescription>Give this location a name !</DialogDescription>
//         </DialogHeader>

//         <Input 
//         placeholder="Give it a name !" 
//         ref={nameInputRef} 
//         />

//         <Button
//             onClick={handleSave}
//         >
//             Add
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default AddScheduleDialog;