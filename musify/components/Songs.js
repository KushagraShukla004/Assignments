import { playlistState } from "@/atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col space-y-2 bg-[#242424] bg-opacity-40 px-8 pb-28">
      {playlist?.tracks?.items?.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
