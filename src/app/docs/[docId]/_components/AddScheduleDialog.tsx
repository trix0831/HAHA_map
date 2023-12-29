import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useState, useRef } from 'react';

type Props = {
    setName: (name) => void;
    setSchLoca:(lo:string[]) => void;
    location: string;
    save: (name:string[], location:string[]) => Promise<void>;
    schLoca: string[];
    schName: string[];
};

function AddScheduleDialog({setName, setSchLoca, location, save, schLoca, schName}:Props) {
  const [open, setOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseAndSave = () => {
    setOpen(false);
    handleSave();
  };

  async function handleSave (){
    const name = textFieldValue;
    const nameStr = name?.toString();

    let b:string[] = [];

    if(name !== undefined){
        await setName((prev:string[]) => [...prev, nameStr]);
        b = [...schName, nameStr];
    }

    if(location !== undefined){
        await setSchLoca([...schLoca, location])
    }

    const a = [...schLoca, location];

    await save(b,a);

    setTextFieldValue('');
  };


  function handleCancel (){
    setOpen(false);
    setTextFieldValue('');
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Schedule
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Add Schedule</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give this location a name !
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Location Name"
              type="email"
              fullWidth
              variant="standard"
              value={textFieldValue}
              ref={nameInputRef}
              onChange={(e) => setTextFieldValue(e.target.value)}
            />
            
          </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCloseAndSave}>Add</Button>
        </DialogActions>
      
      </Dialog>
    </React.Fragment>
  );
}

export default AddScheduleDialog;
