"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInAdmin, signInStudent } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const authFormSchema = (isAdmin: boolean) => {
  return z.object({
    ...(isAdmin
      ? { adminPassword: z.string().min(5).max(15) }
      : { password: z.string().min(5).max(15) }),
    email: z.string()
  });
};

const SignInForm = ({ type, isAdmin }: { type: string, isAdmin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formSchema = authFormSchema(isAdmin);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isAdmin
      ? { email: "", adminPassword: "" }
      : { email: "", password: "" },
  });
  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      let adminId;
      let studentId;

      if (isAdmin) {
        const result = await signInAdmin({
          email: values.email,
          password: (values as { adminPassword: string }).adminPassword,
        });

        adminId = result.sessionId;
      } else {
        const result = await signInStudent({
          email: values.email,
          password: (values as { password: string }).password,
        });

        studentId = result.sessionId;
      }
      
      if (isAdmin) { router.push(`/admin/${adminId}/dashboard`) } else { router.push(`/student/${studentId}/dashboard`)}
    } catch {
      if (type === "sign-in") {
        setErrorMessage("Failed to login. Please try again.");
      } else {
        setErrorMessage("Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="min-h-9/12b mx-6 my-10 md:my-5 md:w-2/6 bg-white p-10 rounded-2xl"
        >
          <div className="flex items-center justify-center">
            {isAdmin ? (
              <Image 
              src="/assets/images/laptop.png"
              width={300}
              height={300}
              alt="auth img"
              />
            ):(
              <Image
                  src="/assets/images/recording.png"
                  width={300}
                  height={300}
                  alt="auth img"
                />
            )}
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">
              {type === "sign-in" ? "Hi, welcome back 👋" : "Create Account"}
            </h1>
          </div>


          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name={`${isAdmin ? "adminPassword" : "password"}`}
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">{(isAdmin) ? "Staff Password" : "Student Password"}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Password"
                      className="shad-input"
                      {...field}
                      value={field.value as string}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-5"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={isAdmin ? "/admin-auth/sign-up" : "/sign-up"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
