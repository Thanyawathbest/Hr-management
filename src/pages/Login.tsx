import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import BusinessIcon from "@mui/icons-material/Business";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelper, setEmailHelper] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // reset errors
    setEmailError(false);
    setEmailHelper("");
    setPasswordError(false);
    setPasswordHelper("");

    // validate
    let hasError = false;
    const emailTrim = email.trim();
    if (!emailTrim) {
      setEmailError(true);
      setEmailHelper("Email is required");
      hasError = true;
    } else {
      // simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailTrim)) {
        setEmailError(true);
        setEmailHelper("Enter a valid email address");
        hasError = true;
      }
    }

    if (!password) {
      setPasswordError(true);
      setPasswordHelper("Password is required");
      hasError = true;
    }

    if (hasError) return;

    console.log(email, password);
    if (email === "admin@test.com" && password === "1234") {
      navigate("/Home/ManageEmployees");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e2f0fb",
      }}
    >
      <Box>
        <Container maxWidth="xs" sx={{ mt: 8, mb: 2 }}>
          {/* Card Login */}
          <Box
            sx={{
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff", // ขาว
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                mx: "auto",
                mb: 2,
                borderRadius: 2,
                backgroundColor: "#2563EB", // น้ำเงิน
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BusinessIcon sx={{ color: "#fff", fontSize: 28 }} />
            </Box>
            <Typography
              variant="h5"
              align="center"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Login
            </Typography>

            {/* form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: -2 }}
              >
                Email Address
              </Typography>

              {/* Email Input */}
              <TextField
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) {
                    setEmailError(false);
                    setEmailHelper("");
                  }
                }}
                placeholder="name@email.com"
                error={emailError}
                helperText={emailHelper}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: -2 }}
              >
                Password
              </Typography>
              {/* Password Input */}
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                  },
                }}
                placeholder="••••••"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) {
                    setPasswordError(false);
                    setPasswordHelper("");
                  }
                }}
                error={passwordError}
                helperText={passwordHelper}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, borderRadius: "10px" }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Container>
        {/* version */}
        <Typography
          variant="body2"
          sx={{
            bottom: 16,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          HRM V1.0
        </Typography>
      </Box>
    </Box>
  );
};
export default Login;
