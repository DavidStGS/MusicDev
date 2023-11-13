import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchSongs from "./component/SearchSongs";
import AdCode from "@/components/AdCode";

export const revalidate = 0;

interface SearchProps {
  searchParams: { title: string };
}
// asd
const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
        
      "
    >
      <Header className="pb-1">
        <div className="my-6 flex flex-col gap-y-6">
          <h1 className="text-white text-4xl font-bold pt-1">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchSongs songs={songs} />
      <div></div>
    </div>
  );
};

export default Search;
