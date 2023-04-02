import React, { useState } from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LoadingButton from "@mui/lab/LoadingButton";
import img from "../assets/avatar.svg";
import logo from "../assets/logo.png";
import Axios from '../axosConfig'
import { useDispatch,useSelector } from "react-redux"
import { login } from "../ReduxStore"
import { useNavigate } from "react-router-dom";

function Layout() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate=useNavigate()
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch()
  const userLogged = useSelector(state => state.user.value.logged)
  const username=useSelector(state => state.user.value.username)
  const [userDetails, setUserDetails] = useState({ Email: "", Password: "" });
  const [emailerr, emailseterr] = useState({
    error: false,
    helperText: "",
  });
  const [passerr, pasSeterr] = useState({
    error: false,
    helperText: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    emailseterr({
      error: false,
      helperText: "",
    });
    pasSeterr({
      error: false,
      helperText: "",
    });
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);

    if (!userDetails.Email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      emailseterr({
        error: true,
        helperText: "Please enter a valid email",
      });
      
    }

    if (!userDetails.Password.trim().match(/^.{8}$/)) {
      pasSeterr({
        error: true,
        helperText: "Password must be 8 character long.",
      });
     
    }

    if (!userDetails.Password.trim().match(/^.{8}$/) || !userDetails.Email.trim().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      return
    }
      try {
        let result = await Axios.post("/login", { userDetails })
        dispatch(login(result.data))
        navigate('/home')
      } catch ({ response }) {
        console.log(response)
        
        if (response.status == 404) {
          setError("user not found");
        }
        if (response.status == 401) {
          setError('incorrect email or password')
        }
      
        if (response.status === 500) {
          setError('Internal server error')
        }

      }
  }

  return (
    <>
      <Box
        component={"div"}
        sx={{ justifyContent: "center", display: "flex", textAlign: "center" }}
      >
        <Stack
          component={"div"}
          spacing={2}
          sx={{
            marginTop: 20,
            alignItems: "center",
            width: "350px",
          }}
        >
          <Avatar
            sx={{ bgcolor: "#EFEFEF", width: "100px", height: "100px", p: 4 }}
            alt="Remy Sharp"
            src={img}
          />
          <Typography variant="h4" color="primary">
            {userLogged?`Welcome ${username}`:'Welcome!'}
          </Typography>
          <Typography variant="body1" sx={{ width: "240px" }} color="primary">
            Let's connect to your workspace. Please enter your email to continue
          </Typography>
          {userLogged==false && <Box top={10} display={"flex"} flexDirection={"column"}>
          {error && (
            <Typography color={"red"} variant="body1" m={2}>
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Email Address"
              variant="outlined"
              name="Email"
              {...emailerr}
              value={userDetails.Email}
              onChange={handleChange}
              size="small"
              sx={{
                width: "350px",
                color: "#003FB9",
                "& .MuiInputBase-root": {
                  height: "38px",
                },
                "& label.Mui-focused": {
                  color: "#003FB9",
                  fontWeight: 600,
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#003FB9",
                  },
                },
              }}
            />
            <FormControl
              sx={{
                mt: 1,
                width: "350px",
                color: "#003FB9",
                "& .MuiInputBase-root": {
                  height: "38px",
                },
                "& label.Mui-focused": {
                  color: "#003FB9",
                  fontWeight: 600,
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#003FB9",
                  },
                },
              }}
              size="small"
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="Password"
                value={userDetails.Password}
                onChange={handleChange}
                error={passerr.error}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon color="secondary" />
                      ) : (
                        <VisibilityOutlinedIcon color="secondary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
              {passerr.error && (
                <Typography
                  ml={2}
                  mt={0.5}
                  textAlign={"start"}
                  variant="subtitle1"
                  color="red"
                >
                  password must be 8 character long
                </Typography>
              )}
            </FormControl>
            <Box mt={2} textAlign={"end"}>
              <Typography variant="body1" fontWeight={600} color="secondary">
                Forgot Password?
              </Typography>
            </Box>
            <Box mt={1}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={false}
                color="secondary"
                fullWidth
              >
                Sign In
              </LoadingButton>
            </Box>
          </form>
        </Box>}
        </Stack>
      </Box>
      <Box>
        <Container sx={{ mt: 10 }}  >
          <Grid container  >
            <Grid item xs={12} sm={6} lg={8}>
              <Box display={"flex"} flexDirection={"row"}>
                <Typography variant="body2" mr={1}>
                  Powered by
                </Typography>
                <img
                  src={logo}
                  style={{ marginTop: 2 }}
                  width={75}
                  height={15}
                  alt=""
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color={"secondary"} variant="caption" mr={2}>
                Need Help?
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
              <Typography color={"secondary"} variant="caption" mr={2}>
                Privacy Policy & Terms
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Layout;
