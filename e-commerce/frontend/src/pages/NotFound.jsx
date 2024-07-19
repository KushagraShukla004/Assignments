const NotFound = () => {
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center">
        <h1 className="text-9xl font-extrabold tracking-widest text-white">
          404
        </h1>
        <div className="absolute rotate-12 rounded bg-[#9748FF] px-2 text-sm">
          Page Not Found
        </div>
        <button className="mt-5">
          <a
            href="/"
            className="group relative inline-block text-sm font-medium text-[#9748FF] focus:outline-none focus:ring active:text-purple-500"
          >
            <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#9748FF] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

            <span className="relative block border border-current bg-[#1A2238] px-8 py-3">
              Go Home
            </span>
          </a>
        </button>
      </main>
    </>
  );
};

export default NotFound;
