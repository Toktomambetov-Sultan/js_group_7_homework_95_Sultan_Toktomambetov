import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import config from "../../config";
import { useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import { getInByGoogle } from "../../store/user/userActions";

const useStyles = makeStyles((theme) => ({
  conatiner: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const getInByGoogleHandler = (data) => dispatch(getInByGoogle(data));
  const responseGoogle = (data) => getInByGoogleHandler(data);

  return (
    <Container className={classes.conatiner}>
      <GoogleLogin
        clientId={config.GoogleClientId}
        buttonText="get in with Google"
        cookiePolicy={"single_host_origin"}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      ></GoogleLogin>
    </Container>
  );
};

export default HomePage;
