import { FaRandom } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

const AleatoryButton = () => {
  const player = usePlayer();

  const onPlayRandom = () => {
    if (player.ids.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * player.ids.length);
    const randomSong = player.ids[randomIndex];

    player.setId(randomSong);
  };

  return (
    <div
      className="              
      flex 
      items-center 
      justify-center
      h-8
      w-8 
      rounded-full  
      cursor-pointer
      mx-5"
    >
      <FaRandom
        className="text-neutral-400 hover:text-white"
        onClick={onPlayRandom}
        size={16}
      />
    </div>
  );
};

export default AleatoryButton;
