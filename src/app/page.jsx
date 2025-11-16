import CreatePost from "@/components/create-post";
import PostCard from "@/components/post-card";
import { AnimatedList } from "@/components/ui/animated-list";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-12 md:px-4 min-h-full justify-center items-center">
      <CreatePost />
      <div className="flex flex-col gap-3 max-w-3xl w-full flex-1">
        <h1 className="text-xl font-bold tracking-wide">Top problems</h1>
        <Suspense
          fallback={
            <Skeleton className="h-24 w-full rounded-md shrink-0 bg-neutral-100 dark:bg-neutral-900" />
          }
        >
          <AnimatedList>
            <TopProblems />
          </AnimatedList>
        </Suspense>
        <footer className="mt-4 text-sm text-start text-neutral-500 text-balance">
          <p>
            Deshfix is an initiative to empower citizens to report and resolve
            local issues. Together, we can build a better India, one problem at
            a time. Our government is failing us, so its up to us to take
            action.
          </p>
          <p>
            Deshfix is not affiliated with any political party or organization.
            But its backed by the people who believe in a better India. Together
            we can make a difference! We can fix Bharat! By fighting for
            practical reforms and real solutions.
          </p>
        </footer>
      </div>
    </div>
  );
}

const TopProblems = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: problems, error } = await supabase
    .from("problems")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(10);
  return problems?.map((problem) => (
    <PostCard key={problem.id} problem={problem} />
  ));
};
