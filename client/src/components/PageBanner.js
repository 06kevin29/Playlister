import { useContext, useState } from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Fab from '@mui/material/Fab'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function PageBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const theme = createTheme({
      palette: {
        buttons: {
          main: "#303030",
          contrastText: "#f5f5f5",
        },
      },
    });

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    
    const handlePublishDateSort = () => {
      store.publishDateSort();
      handleMenuClose();
    }
    const handleNameSort = () => {
      store.nameSort();
      handleMenuClose();
    }
    const handleListensSort = () => {
      store.listensSort();
      handleMenuClose();
    }
    const handleLikesSort = () => {
      store.likesSort();
      handleMenuClose();
    }
    const handleDislikesSort = () => {
      store.dislikesSort();
      handleMenuClose();
    }
    const handleCreatedDateSort = () => {
      store.createdDateSort();
      handleMenuClose();
    }
    const handleEditDateSort = () => {
      store.editedDateSort();
      handleMenuClose();
    }
    const handleGoHome = () => {
      if (auth) {
        store.goHome();
      }
    }
    const handleGoAllLists = () => {
      if (auth) {
        store.goAllLists();
      }
    }
    const handleGoUsers = () => {
      if (auth) {
        store.goUsers();
      }
    }
    let sortingOptions = (
      <div>
        <MenuItem onClick={handlePublishDateSort}>
          Publish Date (Newest)
        </MenuItem>
        <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
        <MenuItem onClick={handleListensSort}>Listens (High to Low)</MenuItem>
        <MenuItem onClick={handleLikesSort}>Likes (High to Low)</MenuItem>
        <MenuItem onClick={handleDislikesSort}>Disikes (High to Low)</MenuItem>
      </div>
    );
    const menuId = 'sort-list-menu';
    if (auth.view === 'HOME') {
      sortingOptions = (
        <div>
          <MenuItem onClick={handleCreatedDateSort}>Creation Date (Newest)</MenuItem>
          <MenuItem onClick={handleEditDateSort}>Last Edit Date (Newest)</MenuItem>
          <MenuItem onClick={handleNameSort}>Name (A-Z)</MenuItem>
        </div>
      );
    }
    let sortMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {sortingOptions}
      </Menu>
    );

    return (
      <Box style={{}} sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          id="PageBanner"
          style={{ backgroundColor: "transparent" }}
        >
          <Toolbar>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "10%",
                  paddingTop: 10,
                }}
              >
                <ThemeProvider theme={theme}>
                  <Fab size="small" color='buttons' disabled={auth.visitor === "GUEST"} onClick={handleGoHome}>
                    <HomeIcon />
                  </Fab>
                  <Fab size="small" color='buttons' onClick={handleGoAllLists}>
                    <GroupsIcon />
                  </Fab>
                  <Fab size="small" color='buttons' onClick={handleGoUsers}>
                    <PersonIcon />
                  </Fab>
                </ThemeProvider>
              </div>
              <div style={{ width: "40%" }}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <TextField
                    InputProps={{ sx: { width: 550, color: "whitesmoke" } }}
                    id="search-bar"
                    className="text"
                    label="Search"
                    variant="outlined"
                    placeholder=""
                    size="small"
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        store.handleSearch();
                      }
                    }}
                  />
                  <IconButton aria-label="search" onClick={store.handleSearch}>
                    <SearchIcon style={{ fill: "whitesmoke" }} />
                  </IconButton>
                </form>
              </div>

              <div>
                Sort by
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="form of sorting"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleSortMenuOpen}
                  color="inherit"
                >
                  <SortIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {sortMenu}
      </Box>
    );
}