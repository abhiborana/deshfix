"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export const createPost = async (data) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("problems").insert([data]);
};
