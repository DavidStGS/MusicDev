"use client";
import Input from "@/components/Input";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUsers";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModalComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Please Select An Image and a Song");
        setIsLoading(false);
        return;
      }

      const uniqID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song/${values.title}-${uniqID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Filed to Upload Song.");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image/${values.title}-${uniqID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Filed to Upload Image.");
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Created Successfully");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something Went Wrong");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Share Your Music"
      description="Upload Your Sounds"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song mp3</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3, .flac"
            {...register("song", { required: true })}
          />
        </div>
        <div className="pb-2">
          <div className="pb-1">Select an image jpeg</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <div className="pb-2">
          <Button
            className="text-white px-3 py-2 "
            disabled={isLoading}
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default UploadModalComp;
