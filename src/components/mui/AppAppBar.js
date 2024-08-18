import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ToggleColorMode from "./ToggleColorMode";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/reducers/authReducer";
import logo from "../assests/gc-logo.png";
import { useNavigate } from "react-router-dom";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode }) {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogoutHandler = () => {
    dispatch(clearUser());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: "none",
        backgroundColor: "#f5f5f5", // Light gray color for the header
        padding: 0,
        margin: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "auto",
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginLeft: "4.5rem" }}
        >
          <img
            src={logo}
            style={logoStyle}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          {userData ? (
            <Button
              variant="text"
              size="small"
              sx={{
                fontFamily: "Poppins",
                fontSize: "1rem",
                textTransform: "uppercase",
                color: "#ee2222",
              }}
              onClick={userLogoutHandler}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                size="small"
                href="/login"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                size="small"
                href="/signup"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
