import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="text-red-500 text-center">
      YOu are not authorized to view this page. Click here to go to dashboard
      <Button variant="outlined" onClick={() => navigate("/dashboard")}>
        Go to dashboard
      </Button>
    </div>
  );
};

export default AccessDenied;
