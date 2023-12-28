import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import type { Activity } from "@/lib/types/db";
import { ListItemButton } from '@mui/material';

type ScheduleListProps = {
  activity: Activity | undefined;
}

function ScheduleList({activity}: ScheduleListProps) {
  return (
    <>
    {/* absolute right-6 top-24 */}
        {activity && activity.schedule_location.map((act, index) =>
        (<List >
          <ListItemButton sx={{ height: '50px' }}>
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
          </ListItemButton>
        </List>)
        )}
    </>
  );
}

export default ScheduleList;