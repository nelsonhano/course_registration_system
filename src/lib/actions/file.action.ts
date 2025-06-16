"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";
import { BroadcastParams, CourseParams } from "./type";
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

const { databases } = await createAdminClient();

export const courseUploader = async ({ courseCode, courseTitle, department, level, semester, session, unit }:CourseParams) => {
  try {
    const courseDetailUploader = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.coursesCollectionId,
      ID.unique(),
      {
        courseCode, 
        courseTitle, 
        department, 
        level, 
        semester, 
        session, 
        unit
      }
    )

    return courseDetailUploader;
  } catch (error) {
    handleError(error, "Field to create course");
  }
}
