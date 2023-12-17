import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      Your shopping is complete. Click here to continue more.
      <Button variant="outlined" onClick={() => navigate("/courses")}>
        Continue shopping
      </Button>
    </div>
  );
};

export default SuccessPage;
