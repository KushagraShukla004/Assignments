// pages/login.js
import { getProviders, getSession, signIn } from "next-auth/react";
import Image from "next/image";

const Login = ({ providers }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      <Image
        src="https://links.papareact.com/9xl"
        alt="Spotify icon"
        width={100}
        height={100}
        priority
        className="mb-5"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-actionColor text-5 rounded-full p-5"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
          >
            Login with <b>{provider.name}</b>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
