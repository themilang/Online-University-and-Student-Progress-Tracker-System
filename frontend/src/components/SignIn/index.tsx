import { GoogleLogin } from '@react-oauth/google';


const SignInWithGoogle = (props: any) => {
  const SERVER_URL=import.meta.env.VITE_SERVER_URL;
  const sucessResponse=(credentialResponse:object)=>{
window.location.href= SERVER_URL + '/auth/google'
  }
    return (
      <GoogleLogin
    onSuccess={sucessResponse}
    onError={() => {
      console.log('Login Failed');
    }}
  />
    );
  };
  export default SignInWithGoogle;