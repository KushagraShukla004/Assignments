import {
  HomeIcon,
  MagnifyingGlassIcon,
  QueueListIcon,
  PlusIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="rounded-lg border-r border-gray-900 p-3 text-sm text-gray-400">
      <div className="bg-secondary space-y-5 rounded-xl p-5">
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
      <div className="bg-secondary space-y-5 rounded-xl p-5">
        <button className="flex items-center gap-1 hover:text-white">
          <HeartIcon className="size-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1 hover:text-white">
            <QueueListIcon className="size-5" />
            <p>Your Library</p>
          </div>
          <button className="hover:text-white">
            <PlusIcon className="size-5" />
          </button>
        </button>
        <hr className="rounded-lg border-t-[2px] border-gray-600" />
        {/* playlist */}
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
        <p className="cursor-pointer hover:text-white">Playlist names...</p>
      </div>
    </div>
  );
};

export default Sidebar;
