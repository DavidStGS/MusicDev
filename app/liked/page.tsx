import Image from "next/image";
import getSongsLiked from "@/actions/getSongsLiked";
import Header from "@/components/Header";
import LikedComponent from "./component/LikedComponent";

export const revalidate = 0;
const LikedPage = async () => {
  const songs = await getSongsLiked();

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
        pb-4 
        
    "
    >
      <Header>
        <div
          className="
            mt-10
        "
        >
          <div
            className="
            flex
            flex-col
            md:flex-row
            items-center
            gap-x-5
          "
          >
            <div
              className="
                relative
                h-28
                w-28
                lg:h-40
                lg:w-40
            "
            >
              <Image
                loading="lazy"
                fetchPriority="high"
                fill
                src="/images/liked.png"
                alt="Liked Songs"
                className="object-cover"
              />
            </div>
            <div
              className="
                flex
                flex-col
                gap-y-1
                mt-5
                md:mt-0"
            >
              <p className="hidden md:block font-bold text-base">PlayList</p>
              <h1
                className="
                text-white
                text-4xl
                font-bold
                md:text-6xl
                "
              >
                Liked Songs
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedComponent songs={songs} />
    </div>
  );
};

export default LikedPage;
