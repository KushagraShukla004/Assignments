/* eslint-disable @next/next/no-img-element */
import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import useSpotify from "@/hooks/useSpotify";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-orange-500",
  "from-lime-500",
  "from-emerald-500",
  "from-teal-500",
  "from-cyan-500",
  "from-violet-500",
  "from-fuchsia-500",
  "from-rose-500",
  "from-amber-500",
];

const millisToHoursAndMinutes = (millis) => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  return `${hours > 0 ? hours + " hr " : ""}${minutes} min`;
};

const Center = () => {
  const spotifyApi = useSpotify();
  const { data, status } = useSession();
  const [color, setColor] = useState();
  const playlistID = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistID]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistID)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong: ", err));
  }, [spotifyApi, playlistID, setPlaylist]);

  console.log("playlist :", playlist);

  return (
    <div className="h-screen flex-grow overflow-y-scroll py-2 pr-2 scrollbar-hide">
      <header className="absolute right-8 top-5">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black bg-opacity-75 p-1 text-white opacity-90 hover:opacity-70 sm:pr-2">
          <img
            className="size-7 rounded-full"
            src={data?.session.user.image}
            alt="Profile Pic"
          />
          <h1 className="text-xs max-sm:hidden">{data?.session.user.name}</h1>
          <ChevronDownIcon className="size-5 max-sm:hidden" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} rounded-xl to-black p-5 text-white`}
      >
        <img
          className="size-24 rounded-xl sm:size-56"
          src={playlist?.images?.[0]?.url}
          alt="Playlist Image"
        />
        <div className="flex flex-col gap-4 pr-2 sm:w-full">
          <p>Playlist</p>
          <h1 className="text-xl sm:text-xl md:text-3xl lg:text-5xl">
            <b>{playlist?.name}</b>
          </h1>
          <p className="space-x-2">
            <b>{playlist?.owner?.display_name}</b>
            {/* <b>:</b>
            <b>{millisToHoursAndMinutes(totalDuration)}</b> */}
          </p>
        </div>
      </section>

      {/* Songs */}
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
