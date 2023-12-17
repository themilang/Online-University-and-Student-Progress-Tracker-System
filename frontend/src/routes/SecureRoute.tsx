import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const SecureRoute = () => {
  const user = useSelector((state: any) => state.auth);
  return <>{user.isLoggedIn ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default SecureRoute;
