import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box,  } from '@mui/material';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');  // Chuyển hướng đến trang đăng nhập
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: { xs: 1, md: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{
              textTransform: 'none',
              '&.active': { fontWeight: 'bold', color: 'white' },
            }}
          >
            Trang chủ
          </Button>
          <Button
            component={NavLink}
            to="/notes"
            color="inherit"
            sx={{
              textTransform: 'none',
              '&.active': { fontWeight: 'bold', color: 'white' },
            }}
          >
            Ghi chú
          </Button>
        </Box>

        {isLoggedIn ? (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Đăng xuất
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={handleLogin} // Chuyển hướng tới trang đăng nhập khi nhấn "Đăng nhập"
            sx={{ textTransform: 'none' }}
          >
            Đăng nhập
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;