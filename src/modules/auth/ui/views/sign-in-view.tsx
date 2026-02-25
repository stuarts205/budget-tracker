"use client";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { OctagonAlertIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/home");
          setPending(false);
        },
        onError: (err) => {
          setError(err.error.message);
          setPending(false);
        },
      },
    );
  };

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/home",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: (err) => {
          setError(err.error.message ?? "Failed to sign in");
          setPending(false);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-8 md:gap-6">
      <div className="md:hidden flex flex-col gap-y-4 items-center justify-center">
        <img src="/logo.svg" alt="Logo" className="h-23 w-23" />
        <p className="text-3xl font-bold text-blue-950">Budget Tracker</p>
      </div>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-blue-950">
                    Welcome back
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email and password to sign in.
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 text-destructive!" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  type="submit"
                  variant="custom"
                  className="w-full"
                  disabled={pending}
                >
                  Sign In
                </Button>
                <div
                  className="after:border-border relative text-center text-sm after:absolute
                    after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                  <span className="relative z-10 bg-card text-muted-foreground px-2">
                    or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => {
                      onSocial("google");
                    }}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      onSocial("github");
                    }}
                    variant="outline"
                    type="button"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    <FaGithub className="mr-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div
            className="bg-radial from-blue-900 to-blue-950 relative hidden 
            md:flex flex-col gap-y-4 items-center justify-center"
          >
            <img src="/logo.svg" alt="Logo" className="h-23 w-23" />
            <p className="text-2xl font-semibold text-white">Budger Tracker</p>
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs 
        text-balance *:[a]:underline *:[a]:underline-offset-4"
      >
        By signing in, you agree to our{" "}
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
