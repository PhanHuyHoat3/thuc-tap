import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'test');
    onLogin();
    const redirectPath = location.state?.from?.pathname || '/notes';
    navigate(redirectPath, { replace: true });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Đăng nhập
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Đăng nhập
        </Button>
      </Box>
    </Container>
  );
}

export default Login;