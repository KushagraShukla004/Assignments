/* eslint-disable @next/next/no-img-element */
import useSpotify from "@/hooks/useSpotify";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  PlusIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState();
  const [playlistID, setPlaylistID] = useState();

  console.log("you picked playlistID :", playlistID);
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="h-screen overflow-y-scroll rounded-lg border-r border-gray-900 p-3 text-xs text-gray-400 scrollbar-hide sm:w-80 sm:text-sm">
      <div className="space-y-5 rounded-xl bg-secondary p-5">
        <button
          className="flex items-center gap-2 hover:text-white"
          onClick={() => signOut()}
        >
          <ArrowLeftStartOnRectangleIcon className="size-5" />
          <p>Log Out</p>
        </button>
        <button className="flex items-center gap-2 hover:text-white">
          <HomeIcon className="size-5" />
          <p>Home</p>
        </button>
        <button className="mt-2 flex items-center gap-2 hover:text-white">
          <MagnifyingGlassIcon className="size-5" />
          <p>Search</p>
        </button>
      </div>
      <hr className="rounded-lg border-t-[8px] border-black" />
      <div className="space-y-5 rounded-xl bg-secondary p-5">
        <button className="flex items-center gap-1 hover:text-white">
          <HeartIcon className="size-5" />
          <p>Liked Songs</p>
        </button>
        <div className="flex w-full items-center justify-between">
          <button className="flex items-center gap-1 hover:text-white">
            <QueueListIcon className="size-5" />
            <p className="max-sm:hidden">Your Library</p>
          </button>
          <button className="hover:text-white">
            <PlusIcon className="size-5" />
          </button>
        </div>
        <hr className="rounded-lg border-t-[2px] border-gray-600" />
        {/* playlist */}
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            className="flex cursor-pointer items-center gap-2 hover:text-white"
            onClick={() => {
              setPlaylistID(playlist.id);
            }}
          >
            {playlist.images.length > 0 && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="h-8 w-8 rounded-full"
              />
            )}
            <p>{playlist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
