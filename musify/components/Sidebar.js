import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  PlusIcon,
  HeartIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session, status } = useSession();

  console.log("session in Sidebar :", session);
  return (
    <div className="scrollbar-hide h-screen overflow-y-scroll rounded-lg border-r border-gray-900 p-3 text-xs text-gray-400 sm:w-80 sm:text-sm">
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
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
      </div>
    </div>
  );
};

export default Sidebar;
