"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { updateStudentDetail } from "@/lib/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { editStudentAuth } from "@/lib/utils";
import { Input } from "./ui/input";
import { EditStudentData, StudentType } from "@/lib/actions/type";

export default function EditStudentForm({ fullName, email, phoneNumber, department, matricNumber, status, level }: StudentType) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // 1. Define your form.
    const form = useForm<z.infer<typeof editStudentAuth>>({
        resolver: zodResolver(editStudentAuth),
        defaultValues: {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            department: department,
            matricNumber: matricNumber,
            status: status,
            level: level
        },
    });

    const onSubmit = async (values: z.infer<typeof editStudentAuth>) => {
        setIsLoading(true);
        setErrorMessage("");

    try {
        const res = await updateStudentDetail({
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            department: values.department,
            matricNumber:    values.matricNumber,
            status: values.status,
            level: values.level
    });

    } catch {
        setErrorMessage("Failed to create account. Please try again.");
    } finally {
        setIsLoading(false);
    }
};
return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="min-h-9/12 mx-6 my-10 md:my-5 bg-white md:w-2/6 p-10 rounded-2xl"
        >
            <div className="flex flex-col gap-5">
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
            </div>
        </form>
    </Form>
)
}
