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
import useDeshfixStore from "@/store";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserIcon, LogOutIcon, ShieldUserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const AuthState = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.email(),
        password: z
          .string({
            message: "Password must be at least 6 characters long",
          })
          .min(6),
      })
    ),
  });
  const [loading, setLoading] = useState(false);
  const user = useDeshfixStore((store) => store.user);
  const open = useDeshfixStore((store) => store.authModalOpen);
  const dispatch = useDeshfixStore((store) => store.dispatch);

  const setOpen = (authModalOpen) => {
    dispatch({ type: "SET_STATE", payload: { authModalOpen } });
  };

  const onSubmit = async (values) => {
    setLoading(true);
    // Handle login/signup logic here
    const supabase = createClient();
    let { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) toast.error(error.message);
    if (data?.user) {
      dispatch({ type: "SET_STATE", payload: { user: data.user } });
      toast.success("Logged in successfully");
    } else {
      let { data, error } = await supabase.auth.signUp(values);
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
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  disabled={loading}
                  size="icon"
                  className="size-8 md:size-12"
                >
                  <ShieldUserIcon className="md:size-6 size-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Login / Sign Up</TooltipContent>
          </Tooltip>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              id="auth-form"
            >
              <DialogHeader>
                <DialogTitle>Welcome back to DeshFix!</DialogTitle>
                <DialogDescription>
                  Just fill the form below to continue.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className={"gap-4"}>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className={"gap-1"}
                    >
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="you@example.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className={"gap-1"}
                    >
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your secure password (min 6)"
                        type="password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <DialogFooter>
                <Field orientation="horizontal" className={"justify-end"}>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading} form="auth-form">
                    Authenticate
                  </Button>
                </Field>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AuthState;
