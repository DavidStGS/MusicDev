import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const getSongsById = (id?: string) => {
    const [loading, setLoading] = useState(false); 
    const [songs, setSongs] = useState<Song | undefined>(undefined  ); 
    const {supabaseClient } = useSessionContext();

    useEffect(() => {
      if(!id){
        return;
      }
      setLoading(true);
      const fetchSongs = async () => {
        const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

        if(error){
          setLoading(false);
          return toast.error(error.message);
        }

        setSongs(data as Song);
        setLoading(false);
      }
      fetchSongs(); 
    }, [id, supabaseClient]);

    return useMemo(() => 
    ({loading, songs}), 
    [loading, songs]);
    
}

export default getSongsById;