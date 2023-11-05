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
                  bg-black
                    px-6
                    py-3
                    text-white
                    border-transparent
                "
                >
                  Logout
                </Button>
                <Button
                  onClick={() => router.push("/account")}
                  className="
                  border-transparent
                  bg-black
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
                    bg-black
                      px-6
                      py-3
                      text-white
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
                    bg-black
                      px-6
                      py-3
                      text-white
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
