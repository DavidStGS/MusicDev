"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  img: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ img, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            pr-4
            "
    >
      <div
        className="
            relative
            min-h-[64px]
            min-w-[64px]"
      >
        <Image
          loading="eager"
          decoding="async"
          quality={75}
          className="objet-cover"
          fill
          sizes="100px"
          src={img}
          alt="Image"
        />
      </div>
      <p className="truncate font-medium py-5">{name}</p>
      <div
        className="
            absolute
            transition
            opacity-0
            rounded-full
            flex
            items-center
            justify-center
            bg-purple-500
            p-4
            drop-shadow-md
            right-5
            group-hover:opacity-100
            hover:scale-110
            "
      >
        <FaPlay />
      </div>
    </button>
  );
};
export default ListItem;
