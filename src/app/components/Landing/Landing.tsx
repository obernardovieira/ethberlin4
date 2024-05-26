import { Box, Button } from "@mui/material";
import { useLogin } from "../../hooks/useLogin";

export const Landing: React.FC = () => {
  const { login } = useLogin();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10, // Increase this value to add more space between the buttons
        height: "calc(100vh - 64px)", // Subtract the height of the AppBar
      }}
    >
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.5rem", py: 4, px: 4, backgroundColor: "#19473f" }}
        onClick={login}
      >
        Mentors
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.5rem", py: 4, px: 4, backgroundColor: "#19473f" }}
        onClick={login}
      >
        Mentees
      </Button>
    </Box>
  );
};