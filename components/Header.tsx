"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUsers";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const AuthModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logout successful");
    }
  };

  return (
    <div className="">
      <div
        className={twMerge(
          `
        h-20
        bg-gradient-to-b
        from-purple-700
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
        -mt-3
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
            transition
            hover:scale-105
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
            transition
            hover:scale-105
          "
            >
              <RxCaretRight className="text-white " size={35}></RxCaretRight>
            </button>
          </div>
          <style jsx>{``}</style>
          <div className="flex md:hidden gap-x-2 items-center">
            <button
              className="rounded-full bg-black p-2 items-center hover:opacity-75 hover:scale-105
              transition"
            >
              <HiHome className="text-white" size={23}></HiHome>
            </button>
            <button
              className="rounded-full bg-black p-2 items-center hover:opacity-75 hover:scale-105
              transition"
            >
              <BiSearch className="text-white" size={23}></BiSearch>
            </button>
          </div>

          <div
            className="
            flex
            justify-between
            gap-x-4
            items-center
        "
          >
            {user ? (
              <div
                className="
                flex
                gap-x-4
                items-center
              "
              >
                <Button
                  onClick={handleLogout}
                  className="
                  bg-[#0a0a0a]
                    px-6
                    py-3
                    text-white
                    border-transparent
                    hover:scale-105
                "
                >
                  Logout
                </Button>
                <Button
                  onClick={() => router.push("/account")}
                  className="
                  border-transparent
                  bg-[#0a0a0a]
                  hover:scale-105
                "
                >
                  <FaUserAlt className="text-white " />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <Button
                    onClick={AuthModal.onOpen}
                    className="
                      border-transparent
                      bg-transparent
                      px-6
                      py-3
                     text-neutral-100
                      hover:scale-105
                      transition
              "
                  >
                    Sign Up
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={AuthModal.onOpen}
                    className="
                      border-transparent
                    bg-[#0a0a0a]
                      px-7
                      py-3
                      text-white
                      hover:text-[#ffffff]
                      hover:scale-105
                      "
                  >
                    Log In
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Header;
