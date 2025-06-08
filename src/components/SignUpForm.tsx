"use client";

import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { authFormSchema, FormType } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createAdminAccount, createStudentAccount } from "@/lib/actions/user.actions";

const SignUpForm = ({ type, isAdmin }: { type: FormType, isAdmin: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formSchema = authFormSchema(isAdmin);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      ...(isAdmin ? {
        departmentOrUnit: "",
          staffId : "",
        role: ""
      } : { department: "",
        matricNumber: ""}),
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log(values);
      const userCreated = isAdmin ? await createAdminAccount({
        fullName: values.fullName || "",
        email: values.email,
        password: values.password,
        department: isAdmin && (values as { departmentOrUnit: string }).departmentOrUnit,
        phoneNumber: values.phoneNumber,
        role: isAdmin && (values as { role: string }).role,
        userIdNumber: isAdmin && (values as { staffId: string }).staffId
      }) : await createStudentAccount({
        fullName: values.fullName || "",
        email: values.email,
        password: values.password,
        department: !isAdmin && (values as { department: string }).department,
        phoneNumber: values.phoneNumber,
        userIdNumber: !isAdmin && (values as { matricNumber: string }).matricNumber
      })
      
      console.log(userCreated);
      
      if (userCreated) {
        isAdmin ? router.push("/admin-auth/sign-in") : router.push("/sign-in");
        }
    } catch {
        setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="min-h-9/12 mx-6 my-10 md:my-5 bg-white md:w-2/6 p-10 rounded-2xl"
        >
          <div className="flex items-center justify-center">
            <Image 
              src="/assets/images/recording.png"
              width={300}
              height={300}
              alt="auth img"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">
              {type === "sign-in" ? "Hi, welcome back 👋" : "Create Account"}
            </h1>
            {(isAdmin || !isAdmin) && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-1 mt-4">
                      <FormLabel className="">Full Name</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="shad-input"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />
            )}
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
            name={isAdmin ? "staffId" : "matricNumber"}
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">
                    {isAdmin ? "Staff ID Number" : "Matric Number"}
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder={isAdmin ? "Staff ID Number" : "Matric Number"}
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

          {((type === "sign-up") || (isAdmin)) && (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item flex flex-col gap-1 mt-4">
                    <FormLabel className="shad-form-label">Phone Number</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your Phone Number"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          {((type === "sign-up") || (isAdmin)) && (
            <FormField
              control={form.control}
              name={isAdmin ? "departmentOrUnit" : "department"}
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item flex flex-col gap-1 mt-4">
                    <FormLabel className="shad-form-label">
                      {isAdmin ? "Department/Unit" : "Department"}
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder={isAdmin ? "Department/Unit" : "Department"}
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
          )}

          {isAdmin && (<FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">Role</FormLabel>

                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value as string}
                      defaultValue={field.value as string}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="course advicer">Course Advicer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />)}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item flex flex-col gap-1 mt-4">
                  <FormLabel className="shad-form-label">Confirm Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Confirm your password"
                      className="shad-input"
                      {...field}
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
              href={isAdmin ? "/admin-auth/sign-in" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
};

export default SignUpForm;
