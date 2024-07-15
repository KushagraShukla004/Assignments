import LogoFilled from "../assets/s_filled96.png";

const Navbar = () => {
  return (
    <div className="flex items-start rounded-full bg-zinc-600 p-2">
      <img
        src={LogoFilled}
        alt="Logo1"
        //trick: use invert to change a black image into white or vice versa
        className="phone:hidden size-12 p-2 invert"
      />
      <h1 className="phone:text-3xl max-phone:hidden p-2 tracking-wide text-white">
        Shopify
      </h1>
    </div>
  );
};

export default Navbar;
