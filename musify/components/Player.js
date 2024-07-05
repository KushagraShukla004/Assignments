/* eslint-disable @next/next/no-img-element */

import { playlistState } from "@/atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtom";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import {
  ArrowsRightLeftIcon,
  SpeakerWaveIcon as VolumeDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  BackwardIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  SpeakerWaveIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(70);
  const playlist = useRecoilValue(playlistState);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
    spotifyApi.setVolume(parseInt(e.target.value)).catch((err) => {
      console.log("Something went wrong!", err.message);
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      //fetch song
      fetchCurrentSong();
      setVolume(70);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackId, spotifyApi, session]);

  return (
    //player functions will not work if the spotify account is not premium
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-950 px-2 text-xs text-white md:px-8 md:text-base">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="size-10 max-md:hidden"
          src={playlist?.tracks?.items?.[0].track.album.images?.[0].url}
          //   src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
          {songInfo?.name ? (
            <h3>{songInfo?.name}</h3>
          ) : (
            <p>{playlist?.tracks?.items?.[0].track.name}</p>
          )}

          {songInfo?.artists?.[0]?.name ? (
            <p>{songInfo?.artists?.[0]?.name}</p>
          ) : (
            <p>{playlist?.tracks?.items?.[0].track.artists?.[0].name}</p>
          )}
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button" />
        {isPlaying ? (
          <PlayCircleIcon onClick={handlePlayPause} className="button" />
        ) : (
          <PauseCircleIcon onClick={handlePlayPause} className="button" />
        )}

        <ForwardIcon className="button" />
        <ArrowPathIcon className="button" />
      </div>
      {/* Right */}
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <SpeakerWaveIcon className="button" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="range range-primary h-2 w-14 cursor-pointer appearance-none rounded-lg bg-gray-200 md:w-28"
        />
        <VolumeDownIcon
          onClick={() => {
            volume < 100 && setVolume(volume + 10);
          }}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
