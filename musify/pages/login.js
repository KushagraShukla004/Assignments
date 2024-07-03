import { getProviders } from "next-auth/react";

const Login = ({ providers }) => {
  return <div>Login</div>;
};

export default Login;

//Server Side Rendering
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
