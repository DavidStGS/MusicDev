"use client";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };
    const stringified = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    return router.push(stringified);
  }, [debouncedValue, router]);
  return (
    <Input
      placeholder="What do you want to hear?"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
export default SearchInput;
