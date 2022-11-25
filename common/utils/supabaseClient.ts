import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export type Post = {
  id: string;
  title: string;
  web_title: string;
  content: string;
  created_at: string;
};

export type PostContent = {
  id: string;
  post_id: string;
  created_at: string;
  type: string;
  content: string;
  order: number;
};


export const getPosts: any = async () => {
  const value = await supabase.from("posts").select("*");
  return value;
};

export const getPost: any = async (id: number) => {
  const value = await supabase.from("posts").select("*").eq("id", id);
  return value;
};

export const getPostByWebTitle: any = async (title: string) => {
  const value = await supabase.from("posts").select("*").eq("web_title", title);
  return value;
};

export const getPostContent: any = async (id: number) => {
  const value = await supabase.from("post_content").select("*").eq("post_id", id);
  return value;
}