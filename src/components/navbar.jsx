import logo from "@/../public/logo_bg.png";
import Image from "next/image";
import Link from "next/link";
import AuthState from "./auth-state";

const Navbar = () => {
  return (
    <nav className="flex p-2 md:p-4 h-full w-fit md:w-full max-w-56 flex-col gap-4 justify-between">
      <Link
        href={"/"}
        className="relative size-8 md:size-12 rounded-full overflow-hidden bg-blue-950"
      >
        <Image src={logo} alt="deshfix" fill priority />
      </Link>
      <AuthState />
    </nav>
  );
};

export default Navbar;
