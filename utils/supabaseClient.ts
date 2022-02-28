import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

type Post = {
  id: string;
  title: string;
  content: string;
};

export const getPosts: any = async () => {
    const value = await supabase.from('posts').select('*');
    console.log(value);
    return value;
};
