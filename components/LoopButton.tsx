import { FaRandom } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

const AleatoryButton = () => {
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
      <FaRandom className="text-neutral-400 hover:text-white" size={16} />
    </div>
  );
};

export default AleatoryButton;
