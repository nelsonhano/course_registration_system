'use client';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadCourseFormSchema } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import SelectSemester from "./SelectSemester";
import SelectLevel from "./SelectLevel";
import { courseUploader } from "@/lib/actions/file.action";
import { useRouter } from "next/navigation";
import { DatePicker } from "./DatePicker";


export default function UploadCourseComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const formSchema = uploadCourseFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department: "",
            level: undefined,
            semester: undefined,
            session: "",
            courseCode: "",
            courseTitle: "",
            unit: 0,
        },
    });
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage("");
        const { courseCode, courseTitle, department, level, semester, session, unit} = values;
    
        try {
            const uploadCourse = 
            await courseUploader({ courseCode, courseTitle, department, level, semester, session, unit });

            uploadCourse && form.reset() && router.push("/admin/upload-course");
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
    <div className="my-10">
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
            >
                <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Department</FormLabel>
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
                        name="level"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Level</FormLabel>
                                    <FormControl>
                                        <SelectLevel
                                            placeholder="Level"
                                            value={field.value as string}
                                            field={field}
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
                        name="semester"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Semester</FormLabel>
                                    <FormControl>
                                        <SelectSemester
                                            placeholder="Semester"
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
                        name="session"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Session</FormLabel>
                                    <FormControl>
                                        <DatePicker field={field} />
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
                        name="courseCode"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Course Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="course code"
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
                        name="courseTitle"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Course Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="course title"
                                            {...field}
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
                        name="unit"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Unit</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Unit"
                                            {...field}
                                            value={field.value as number}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                </div>

                <SubmitButton className="mt-5 w-2/6 cursor-pointer bg-blue-700" isLoading={isLoading}>Upload Course</SubmitButton>
            </form>
        </Form>
    </div>
)}
