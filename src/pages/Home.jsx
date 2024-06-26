import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Main from './drawerPage/Main';
import Faq from './drawerPage/Faq';
import Rap from './drawerPage/Rap';
import Profile from './drawerPage/Profile';
import Lib from './drawerPage/Lib';
import Customers from './drawerPage/Customers';
import Search from './drawerPage/Search';
import BecomeA from './drawerPage/BecomeA';
import logo from '../assets/logo1.png';

const drawerWidth = 240;

const array1 = [
  { "text": "Home", "icon": <HomeOutlinedIcon />, "path": "/Main" },
  { "text": "Search", "icon": <SearchRoundedIcon />, "path": "/Search" },
  { "text": "Library", "icon": <LibraryMusicOutlinedIcon />, "path": "/Lib" },
  { "text": "Profile", "icon": <AccountCircleOutlinedIcon />, "path": "/Profile" },
];

const array2 = [
  { "text": "Add Song", "icon": <AddCircleOutlineOutlinedIcon />, "path": "/BecomeA" },
  { "text": "Frequently Asked Questions", "icon": <QuestionMarkOutlinedIcon />, "path": "/Faq" },
  { "text": "Customers Service", "icon": <QuestionAnswerOutlinedIcon />, "path": "/Customers" },
];

export default function PermanentDrawerLeft() {
  const [selectedPage, setSelectedPage] = useState('/Main');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: 'black',  // Set the background color of the drawer paper to black
            color: 'white'             // Ensure the text color is white for visibility
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            paddingTop: 0,  // Remove any padding from the top to ensure no margin above the logo
          }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ width: '150px',height:'100px', marginTop: -1}} 
          />
        </Box>
        <List>
          {array1.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton onClick={() => setSelectedPage(item.path)}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ backgroundColor: 'white' }} /> {/* Set the divider color to white */}
        <List>
          {array2.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton onClick={() => setSelectedPage(item.path)}>
                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, backgroundColor: '#0C0C0C',   p: 3 }}
      >
        <Toolbar />
        {selectedPage === '/Main' && <Main />}
        {selectedPage === '/Search' && <Search />}
        {selectedPage === '/Lib' && <Lib />}
        {selectedPage === '/Profile' && <Profile />}
        {selectedPage === '/BecomeA' && <BecomeA />}
        {selectedPage === '/Rap' && <Rap />}
        {selectedPage === '/Faq' && <Faq />}
        {selectedPage === '/Customers' && <Customers />}
      </Box>
    </Box>
  );
}
