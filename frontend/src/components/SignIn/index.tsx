import { GoogleLogin } from "@react-oauth/google";

const SignInWithGoogle = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const successResponse = (credentialResponse: object) => {
    window.location.href = SERVER_URL + "/auth/google";
  };
  return (
    <GoogleLogin
      onSuccess={successResponse}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default SignInWithGoogle;
