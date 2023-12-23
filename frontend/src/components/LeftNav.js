// src/components/LeftNav.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CodeIcon from '@mui/icons-material/Code';

function LeftNav() {
    return (
        <Drawer
            variant="permanent"
            anchor="top"
        >
            <div className="flex items-center justify-center p-4">
                <img src="/logo512.png" alt="Logo" className="w-18 h-20" /> {/* Your logo here */}
            </div>
            <List>
                {['Dashboard', 'Repositories', 'Workflow Runs'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index === 0 && <HomeIcon />}
                            {index === 1 && <CodeIcon />}
                            {index === 2 && <AssessmentIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default LeftNav;
