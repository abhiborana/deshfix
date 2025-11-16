"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useDeshfixStore from "@/store";
import { createClient } from "@/utils/supabase/client";
import { produce } from "immer";
import { CircleUserIcon, LockIcon, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AuthState = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const user = useDeshfixStore((store) => store.user);
  const open = useDeshfixStore((store) => store.authModalOpen);
  const dispatch = useDeshfixStore((store) => store.dispatch);

  const setOpen = (authModalOpen) => {
    dispatch({ type: "SET_STATE", payload: { authModalOpen } });
  };

  const handleChange = (e) => {
    setFormState(
      produce(formState, (draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle login/signup logic here
    const supabase = createClient();
    let { data, error } = await supabase.auth.signInWithPassword(formState);
    if (error) toast.error(error.message);
    console.log(`🚀 ~ handleSubmit ~ data:`, data);
    if (data?.user) {
      dispatch({ type: "SET_STATE", payload: { user: data.user } });
      toast.success("Logged in successfully");
    } else {
      let { data, error } = await supabase.auth.signUp(formState);
      console.log(`🚀 ~ handleSubmit ~ data2:`, data);
      if (error) toast.error(error.message);
      if (data?.user) {
        dispatch({ type: "SET_STATE", payload: { user: data.user } });
        toast.success("Account created successfully");
      }
    }
    setOpen(false);
    setLoading(false);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    let { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    dispatch({ type: "SET_STATE", payload: { user: null } });
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const userFetcher = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      console.log(`🚀 ~ userFetcher ~ user:`, user);
      if (data?.user)
        dispatch({ type: "SET_STATE", payload: { user: data.user } });
      setLoading(false);
    };

    if (!user) userFetcher();

    return () => {
      setLoading(false);
    };
  }, [dispatch, user, setLoading]);

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className={"rounded-md md:size-12"}>
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.email}`}
                alt={user.email || "User"}
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuItem
              className={
                "w-full flex items-center gap-2 line-clamp-1 break-all"
              }
            >
              <CircleUserIcon className="inline mr-2" />
              <span>{user.email}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button disabled={loading}>
              <span className="hidden md:block">Login / Sign Up</span>
              <span className="md:hidden">
                <LockIcon />
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Welcome back to DeshFix!</DialogTitle>
                <DialogDescription>
                  Just fill the form below to continue.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="user@deshfix.com"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                    placeholder="********"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  Authenticate
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AuthState;
