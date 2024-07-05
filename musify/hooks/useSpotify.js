import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "@/lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //if refresh acces token doesnt work then redirect user to login
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.token.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
