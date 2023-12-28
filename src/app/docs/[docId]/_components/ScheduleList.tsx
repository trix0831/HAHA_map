import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PlaceIcon from '@mui/icons-material/Place';
import type { Activity } from "@/lib/types/db";

type ScheduleListProps = {
  activity: Activity | undefined;
}

function ScheduleList({activity}: ScheduleListProps) {
  return (
    <>
    {/* absolute right-6 top-24 */}
      <List sx={{ width: '100%', maxWidth: 360}} >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PlaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="nam1" secondary="loca1"/>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PlaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="nam1" secondary="loca1"/>
          </ListItem>
      </List>

        {activity && activity.schedule_location.map((act, index) =>
        (<List className='absolute right-6 top-16 bg-blue-300 w-3/12'>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PlaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={activity.schedule_name[index]} secondary={act} />
          </ListItem>
        </List>)
        )}
    </>
  );
}

export default ScheduleList;