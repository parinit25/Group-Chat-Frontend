import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PropTypes from "prop-types";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RedirectIfAuthenticated from "./components/common/RedirectIfAuthenticated";
import Footer from "./components/mui/Footer";
import getLPTheme from "./components/mui/getLPTheme";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import Authenticated from "./utils/Authenticated";
import RequireAuth from "./components/common/RequireAuth";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/mui/AppAppBar";
import ChatPage from "./pages/ChatPage";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value={true}>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

function App() {
  const [mode, setMode] = React.useState("light");
  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const userData = useSelector((state) => state.user.user);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleCustomTheme = (event, newTheme) => {
    if (newTheme !== null) {
      setShowCustomTheme(newTheme);
    }
  };

  return (
    <>
      <ThemeProvider theme={showCustomTheme ? defaultTheme : defaultTheme}>
        <CssBaseline />
        <Authenticated />
        <Toaster position="top-right" />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>
        </Routes>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
