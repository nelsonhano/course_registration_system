"use client";

import { useState } from "react";
import SelectAdvisorField from "./SelectAdvisorField";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { advicorFormSchema } from "@/lib/utils";
import SelectLevel from "./SelectLevel";
import SelectDepartment from "./SelectDepartment";
import SubmitButton from "./SubmitButton";


type Advisor = {
    fullName: string
}
export default function SelectAdvicor({ advisors }: { advisors: Advisor[]}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const formSchema = advicorFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selectAdvicor: undefined,
            selectLevel: undefined,
            selectDepartment: undefined,
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
    <div className="my-10">
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="selectAdvicor"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Select Advicor</FormLabel>
                                    <FormControl>
                                        <SelectAdvisorField
                                            placeholder="Select Advicor"
                                            field={field}
                                            value={field.value as string}
                                            advisors={advisors}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="shad-form-message" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="selectDepartment"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Select Department</FormLabel>
                                    <FormControl>
                                        <SelectDepartment 
                                            placeholder="Select Department eg(Software Engineering)"
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
                        name="selectLevel"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Select Level</FormLabel>
                                    <FormControl>
                                        <SelectLevel
                                            placeholder="Select Level eg(100 level)"
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

                <SubmitButton className="mt-5 md:w-2/6 cursor-pointer bg-blue-700" isLoading={isLoading}>
                    Upload Course
                </SubmitButton>
            </form>
        </Form>
    </div>
)
}
