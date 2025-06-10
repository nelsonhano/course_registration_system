"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import path from "path";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { updateStudentDetail } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import EditStudentLevel from "./EditStudentLevel";
import { StudentType } from "@/lib/actions/type";
import { editStudentAuth } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { Input } from "./ui/input";
import Gender from "./Gender";
import Status from "./Status";
import { useRouter } from "next/navigation";

export default function EditStudentForm(
    { fullName, email, phoneNumber, department, matricNumber, status, gender, level, userId, adminId }:
    StudentType
) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const form = useForm<z.infer<typeof editStudentAuth>>({
        resolver: zodResolver(editStudentAuth),
        defaultValues: {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            department: department,
            matricNumber: matricNumber,
            status: status,
            gender: gender,
            level: level
        },
    });

    const onSubmit = async (values: z.infer<typeof editStudentAuth>) => {
        setIsLoading(true);
        setErrorMessage("");
        
        try {
            await updateStudentDetail({
                adminId: adminId,
                userId: userId,
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                department: values.department,
                matricNumber: values.matricNumber,
                status: values.status,
                gender: values.gender,
                level: values.level
            });

            return router.back()
    } catch {
        setErrorMessage("Failed to submit. Please try again.");
    } finally {
        setIsLoading(false);
    }
};
return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-9/12 my-10 md:my-5 bg-white -ml-10 md:w-3/5 p-10 rounded-2xl"
        >
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                <FormItem>
                    <div className="flex flex-col gap-1 mt-4">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter your full name"
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
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
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
                name="phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your phone number"
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
                name="department"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
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
                name="matricNumber"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Matric Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
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
                name="level"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Level</FormLabel>
                            <FormControl>
                                <EditStudentLevel 
                                    placeholder={level}
                                    value={field.value as string}
                                    field={field}
                                />
                            </FormControl>
                        </div>
                        <FormMessage className="shad-form-message" />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Gender 
                                    placeholder={gender}
                                    value={field.value as string}
                                    field={field}
                                />
                            </FormControl>
                        </div>
                        <FormMessage className="shad-form-message" />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormItem>
                        <div className="flex flex-col gap-1 mt-4">
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Status 
                                    placeholder={status}
                                    value={field.value as string}
                                    field={field}
                                />
                            </FormControl>
                        </div>
                        <FormMessage className="shad-form-message" />
                    </FormItem>
                )}
            />
            
            <SubmitButton className="mt-5 w-full cursor-pointer bg-blue-700 " isLoading={isLoading}>
                Save and exit
            </SubmitButton>
        </form>
    </Form>
)
}
