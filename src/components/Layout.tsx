import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./layout/Sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Box, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layout = () => {
  const { logout } = useAuth();

  return (
    <Box className="flex h-screen bg-gray-100">
      <Sidebar />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Box className="bg-white shadow-sm">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="flex-1 text-black">
              GastroVision AI
            </Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </Box>
        <Box className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;