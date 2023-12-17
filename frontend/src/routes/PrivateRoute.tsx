import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { role } = useSelector((state: any) => state.auth);
  return (
    <>{role === "admin" ? <Outlet /> : <Navigate to={"/access-denied"} />}</>
  );
};

export default PrivateRoute;
