"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const createPost = async (data) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("problems").insert([data]);
};

export const fetchComments = async (postId) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("comments")
    .select("*")
    .eq("problem_id", postId)
    .order("created_at", { ascending: true });
};

export const addComment = async (data) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("comments").insert([data]).select().single();
};
