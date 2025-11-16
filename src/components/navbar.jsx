import logo from "@/../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import AuthState from "./auth-state";

const Navbar = () => {
  return (
    <nav className="flex p-2 md:p-3 h-full w-fit flex-col gap-4 justify-between items-start bg-neutral-200">
      <Link
        href={"/"}
        className="relative size-8 md:size-12 overflow-hidden rounded-md"
      >
        <Image src={logo} alt="deshfix" fill priority />
      </Link>
      <AuthState />
    </nav>
  );
};

export default Navbar;
