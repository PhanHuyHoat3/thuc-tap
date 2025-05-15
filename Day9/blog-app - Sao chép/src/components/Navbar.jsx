import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const activeClassName = "font-bold underline";

export default function Navbar() {
  return (
    <AppBar position="static" className="bg-blue-700">
      <Toolbar className="flex space-x-6">
        <Button
          color="inherit"
          component={NavLink}
          to="/"
          className={({ isActive }) =>
            isActive ? activeClassName : undefined
          }
        >
          Trang chủ
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/posts"
          className={({ isActive }) =>
            isActive ? activeClassName : undefined
          }
        >
          Bài viết
        </Button>
        <Button
          color="inherit"
          component={NavLink}
          to="/posts/new"
          className={({ isActive }) =>
            isActive ? activeClassName : undefined
          }
        >
          Thêm bài viết mới
        </Button>
      </Toolbar>
    </AppBar>
  );
}