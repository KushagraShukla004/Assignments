/* eslint-disable @next/next/no-img-element */
import useSpotify from "@/hooks/useSpotify";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  return (
    <div className="grid cursor-pointer grid-cols-2 rounded-lg py-4 text-sm text-gray-500 hover:bg-[#2a2a2a]">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="size-10"
          src={track.track.album.images[0].url}
          alt="Album"
        />
        <div>
          <p className="w-36 truncate border text-white lg:w-64">
            {track.track.name}
          </p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto mr-2 flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>duration</p>
      </div>
    </div>
  );
};

export default Song;
