/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-gray-500",
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
const Center = () => {
  const { data, status } = useSession();
  const [color, setColor] = useState();
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute right-8 top-5">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black bg-opacity-75 p-1 pr-2 text-white opacity-90 hover:opacity-70">
          <img
            className="size-10 rounded-full"
            src={data?.session.user.image}
            alt="Profile Pic"
          />
          <h2>{data?.session.user.name}</h2>
          <ChevronDownIcon className="size-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default Center;
