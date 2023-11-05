"use client";
import { useRouter } from "next/navigation";

interface ListItemProps {
  img: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ img, name, href }) => {
  const router = useRouter();

  return <div>List Here!</div>;
};
export default ListItem;
