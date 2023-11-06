import { cookies } from "next/headers";
import { Song } from "../types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongs = async ():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies    
    });

    const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as Song[]) || [];
} 
export default getSongs;