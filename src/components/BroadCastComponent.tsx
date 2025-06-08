"use client";

import { broadCastFormSchema } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import SelectLevel from "./SelectLevel";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";
import SelectPermission from "./SelectPermission";
import { uploadBroadcastMessage } from "@/lib/actions/file.action";

export default function BroadCastComponent() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = broadCastFormSchema();
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: "",
                message: "",
                permission: undefined,
            },
        });
        
        const onSubmit = async (values: z.infer<typeof formSchema>) => {
            setIsLoading(true);
            setErrorMessage("");

            const { title, message, permission} = values;
        
            try {
                const broadcastMsg = await uploadBroadcastMessage({ title, message, permission });
            } catch {
            } finally {
                setIsLoading(false);
            }
        };
return (
    <div>
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col h-screen"
            >
                <div className="flex flex-col w-full justify-between gap-2 md:gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="message title"
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
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="message body"
                                            value={field.value as string}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-red-700" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="permission"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <div className="flex flex-col gap-1 mt-4">
                                    <FormLabel className="shad-form-label">Target Audience</FormLabel>
                                    <FormControl>
                                        <SelectPermission
                                            field={field}
                                            placeholder="All User"
                                            value={field.value as string}

                                        />
                                    </FormControl>
                                </div>
                                <FormMessage className="text-red-700" />
                            </FormItem>
                        )}
                    />
                </div>

                <SubmitButton className="mt-5 md:w-2/6 cursor-pointer bg-blue-700 " isLoading={isLoading}>Send Message</SubmitButton>
            </form>
        </Form>
    </div>
)
}
