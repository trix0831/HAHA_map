import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import type { Activity_detial } from "@/lib/types/db";
import { ListItem } from '@mui/material';

type ScheduleListProps = {
  activity: Activity_detial | undefined;
}

function ScheduleList({activity}: ScheduleListProps) {
  return (
    <>
    {/* absolute right-6 top-24 */}
      <div className="schedule-list-container mt-2 bg-slate-100" style={{ maxHeight: '425px', overflowY: 'scroll', }}>
          {activity && activity.schedule_location.map((act, index) =>
          (<List>
            <ListItem sx={{ height: '40px' }} className='flex hover:bg-slate-200'>
              <ListItemAvatar>
                <Avatar>
                  <PlaceIcon />
                </Avatar>
              </ListItemAvatar>

              <ListItemText primary={activity.schedule_name[index]} secondary={act
                .split('-') // Split the string at "-"
                .map((part) => part.trim().slice(0, 6)) // Extract the first 5 words from each part
                .join('-')}  sx={{ whiteSpace: 'nowrap' }}
              />

              <div className='hover:bg-slate-300 mr-1'>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.5L12 7" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11.0883L12 6.50002L16 11.0883" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className='hover:bg-slate-300'>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6.5L12 17" stroke="#363853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12.9117L12 17.5L8 12.9117" stroke="#0095FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

            </ListItem>
          </List>)
          )}

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