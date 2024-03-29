"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUsers";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import toast from "react-hot-toast";

interface LikeButtonProps {
  songId: string;
}
const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const AuthModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchLikedSongs = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchLikedSongs();
  }, [songId, user?.id, supabaseClient]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user?.id) {
      return AuthModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({ user_id: user.id, song_id: songId });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Song liked!");
      }
    }
    router.refresh();
  };
  return (
    <button className=" hover: opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#a855f7" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
