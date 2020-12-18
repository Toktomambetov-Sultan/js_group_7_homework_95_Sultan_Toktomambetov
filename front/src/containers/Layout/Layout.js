import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { push } from "connected-react-router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import { logOut } from "../../store/user/userActions";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  displayName: {
    margin: "5px",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.cocktail.isLoading);
  const dispatch = useDispatch();

  const changePath = (path) => {
    dispatch(push(path));
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <div>
      <AppBar component={Box} position="static" pb={2}>
        <Toolbar>
          <Container>
            <Grid container direction="column">
              <Grid item container justify="space-between" alignItems="center">
                <Typography variant="h4">Cocktail App</Typography>
                <MenuItem onClick={() => changePath(config.pathAfterGetIn)}>
                  <Typography variant="h6">Cocktails</Typography>
                </MenuItem>
                {user?.token && (
                  <div>
                    <Grid container alignItems="center" direction="row">
                      <Avatar
                        alt="person image"
                        src={user?.avatarImage || config.usersData.defaultImg}
                      />
                      <Typography className={classes.displayName} variant="h6">
                        {user?.displayName}
                      </Typography>
                    </Grid>
                  </div>
                )}

                {user?.token ? (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={logOutHandler}
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <MenuItem onClick={() => changePath("/")}>
                    <Typography variant="h6">Get in</Typography>
                  </MenuItem>
                )}
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" paddingTop="5px">
        <Backdrop open={isLoading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Container>{children}</Container>
      </Box>
    </div>
  );
};

export default Layout;
