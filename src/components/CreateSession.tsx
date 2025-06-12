"use client";

import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { academiSessionFormSchema } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { z } from "zod";
import SelectSemester from "./SelectSemester";
import { DatePicker } from "./DatePicker";

export default function CreateSession() {
        const [isLoading, setIsLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");
    
        const formSchema = academiSessionFormSchema();
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                sessionTitle: "",
                semester: undefined,
                endDate: "",
                startDate: "",
            },
        });
        
        const onSubmit = async (values: z.infer<typeof formSchema>) => {
            setIsLoading(true);
            setErrorMessage("");
        
            try {
            console.log(values);
            } catch {
            } finally {
                setIsLoading(false);
            }
        };
return (
    <div className='my-10'>
        <h1 className='text-3xl'>Create New Academic Session</h1>
        
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="sessionTitle"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Session Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Department"
                                            className="w-full"
                                            {...field}
                                            value={field.value as string}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Semester</FormLabel>
                                    <FormControl>
                                        <SelectSemester
                                            placeholder="Semester"
                                            field={field}
                                            value={field.value as string}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Start Date</FormLabel>
                                    <FormControl>
                                        <DatePicker field={field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">End Date </FormLabel>
                                    <FormControl>
                                        <DatePicker field={field} />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                </div>

                <SubmitButton className="mt-5 md:w-2/6 cursor-pointer bg-blue-700" isLoading={isLoading}>Upload Course</SubmitButton>
            </form>
        </Form>
    </div>
)
}
