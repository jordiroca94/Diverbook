"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import Icon from "../../public/assets/images/icon.png";
import Image from "next/image";
const Header = () => {
  const { data: session } = useSession();

  const navLinks = [
    { label: "Community", link: "/divers" },
    { label: "Dives", link: "/dives" },
    { label: "Contact", link: "/" },
  ];

  return (
    <header className="px-6 min-h-header lg:px-10 py-4 fixed top-0 z-50 w-full p-6 flex justify-between items-center border border-mediumGray bg-white">
      <Link
        href={"/"}
        className="font-extrabold text-primary text-lg lg:text-2xl flex items-center gap-4  "
      >
        <span>Diverbook</span>
        <Image className="size-10 hidden lg:block" src={Icon} alt="Home Icon" />
      </Link>
      <div className="flex justify-between gap-8 items-center">
        <div className="hidden lg:flex gap-4">
          {navLinks.map((link) => (
            <Link href={link.link} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
        {!session ? (
          <div>
            <a
              className="text-base font-bold text-primary  w-fit rounded-md py-2 px-4 cursor-pointer hover:text-primary/80"
              href="/login"
            >
              Login
            </a>
            <a
              className="text-base font-bold text-white border w-fit rounded-md py-2 px-4 cursor-pointer ml-2 hover:bg-primary/80 bg-primary"
              href="/register"
            >
              Sign up
            </a>
          </div>
        ) : (
          <Link
            href="/profile"
            className="flex gap-2 items-center text-primary"
          >
            <CgProfile className="h-7 w-7" />
            <p>Profile</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
