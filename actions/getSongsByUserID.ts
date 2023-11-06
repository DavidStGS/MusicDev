import { cookies } from "next/headers";
import { Song } from "../types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsByUserID = async ():Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies    
    });

    const { 
        data:sessionData, 
        error:sessionError 
    } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;
    
    const {data, error} = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false });

    if (error) throw error;
    
    return (data as Song[]) || [];
} 

export default getSongsByUserID;