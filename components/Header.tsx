"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const handleLogout = () => {};

  return (
    <div className="">
      <div
        className={twMerge(
          `
        h-20
        bg-gradient-to-b
        from-purple-500
        p-6
    `,
          className
        )}
      >
        <div
          className="
        w-full
        flex
        justify-between
        items-center
        -mt-2
        "
        >
          <div
            className="
            
        hidden
        md:flex
        gap-x-2
        items-center
        "
          >
            <button
              onClick={() => router.back()}
              className="
            rounded-full
            bg-black
            flex
            align-center
            justify-center
            hover:opacity-75
            trasition
          "
            >
              <RxCaretLeft className="text-white" size={35}></RxCaretLeft>
            </button>
            <button
              onClick={() => router.forward()}
              className="
            rounded-full
            bg-black
            flex
            align-center
            justify-center
            hover:opacity-75
            trasition
          "
            >
              <RxCaretRight className="text-white " size={35}></RxCaretRight>
            </button>
          </div>
          <style jsx>{``}</style>
          <div className="flex md:hidden gap-x-2 items-center">
            <button
              className="rounded-full bg-white p-2 items-center hover:opacity-75
            trasition"
            >
              <HiHome className="text-black" size={23}></HiHome>
            </button>
            <button
              className="rounded-full bg-white p-2 items-center hover:opacity-75
            trasition"
            >
              <BiSearch className="text-black" size={23}></BiSearch>
            </button>
          </div>

          <div
            className="
            flex
            justify-bewteen
            gap-x-4
            items-center
        "
          >
            <>
              <div>
                <Button
                  onClick={() => {}}
                  className="
                border-transparent
                bg-trasnparent
              text-neutral-300
                font-medium
              "
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {}}
                  className="
                border-transparent
              bg-white
              px-6
              py-2
              "
                >
                  Log In
                </Button>
              </div>
            </>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Header;
