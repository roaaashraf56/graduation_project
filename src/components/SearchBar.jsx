import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, InputBase, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

export default function PrimarySearchAppBar() {
  return (
    <Box>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top:0,
          backgroundColor: 'var(--card-bg)',
          color: 'var(--text-dark)',
          borderRadius: 2,
          p: 1,
          border: 'none',
          boxShadow:'none'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>

          {/* Search Center */}
      <Paper
  component="form"
  sx={{
    p: '2px 10px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    borderRadius: '50px',
    backgroundColor: '#fff',     // خلفية بيضاء
    border: '1px solid #ddd',
    transition: '0.2s ease',
    
    // هOVER → يبقى رمادي
    "&:hover": {
      backgroundColor: '#f2f2f2',
    },

    // نحركه للشمال بدل الـ absolute center
    position: 'static',
    ml: 9,  // margin-left
  }}
>
  <SearchIcon sx={{ color: '#888', mr: 1, fontSize:'20px' }} />
  <InputBase
    sx={{ ml: 1, flex: 1, fontSize:'15px' }}
    placeholder="Search…"
  />
</Paper>


          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto' }}>
            <IconButton size="small">
              <SettingsIcon sx={{ fontSize: 23, color: 'var(--accent)' }} />
            </IconButton>
            <IconButton size="small">
              <AccountCircle sx={{ fontSize: 23, color: 'var(--accent)' }} />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
