import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import spotifyApi from "@/lib/spotify";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const useSongInfo = () => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `bearer ${spotifyApi.getAccessToken()}`,
            },
          },
        ).then((res) => res.json());
        setSongInfo(trackInfo);
      }
    };
  }, [currentTrackId]);
  return songInfo;
};

export default useSongInfo;
