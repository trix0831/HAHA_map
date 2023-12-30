import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
// import type { Activity_detial } from "@/lib/types/db";
import { ListItem } from '@mui/material';
import { useActivity } from '@/hooks/useActivity';

type ScheduleListProps = {
  // activity: Activity_detial | undefined;
  setLoca: (lo: string) => void;
  name: string[];
  location: string[];
}

function ScheduleList({setLoca, name, location}: ScheduleListProps) {
  const { postSchedule, setSchLoca, setSchName} = useActivity();

  const setMarkerLocation = (index: number) => {
    setLoca(location[index]);
  }
  const swap = (index: number) => {
    const newScheduleName: string[] = [];
    const newScheduleLocation: string[] = [];
    for(let i = 0; i < name.length; i++){
      newScheduleName[i] = name[i];
      newScheduleLocation[i] = location[i];
    }
    newScheduleName[index-1] = name[index];
    newScheduleName[index] = name[index-1];
    newScheduleLocation[index-1] = location[index];
    newScheduleLocation[index] = location[index-1];
    setSchLoca(newScheduleLocation);
    setSchName(newScheduleName);
    console.log(name);
    postSchedule(newScheduleName, newScheduleLocation);
  }
  return (
    <>
      <div className="schedule-list-container bg-slate-100 h-full" style={{  overflowY: 'scroll', borderRadius: '12px'}}>
      <List>
        {location.map((act, index) =>
          (
            <ListItem key = {index} sx={{ height: '40px', borderRadius : '8px'}} className='flex hover:bg-slate-200 mb-3' onClick={() => {setMarkerLocation(index)}}>
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={name[index]} secondary={
                act
                .split('-') // Split the string at "-"
                .map((part) => part.trim().slice(0, 6)) // Extract the first 5 words from each part
                .join('-')}  sx={{ whiteSpace: 'nowrap' }}
              />

              <div className='hover:bg-slate-300 mr-1' onClick={() => {swap(index)}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.5L12 7" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11.0883L12 6.50002L16 11.0883" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className='hover:bg-slate-300' onClick={() => {swap(index+1)}}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.5L12 17" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12.9117L12 17.5L8 12.9117" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

            </ListItem>
          )
          )}
          </List>

          {location.length === 0 && <p className='flex justify-center'>go add some schedule !</p>}

          <style>{`
          ::-webkit-scrollbar {
            width: 0;  /* Remove scrollbar width */
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent;  /* Make scrollbar thumb transparent */
          }
        `}</style>
      </div>
    </>
  );
}

export default ScheduleList;