export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  studentCollectionId: process.env.NEXT_PUBLIC_APPRWRITE_STUDENTS_COLLECTION!,
  assignedCourseAdvisorCollectionId: process.env.NEXT_PUBLIC_APPRWRITE_ASSIGN_ADVISOR_COLLECTION!,
  adminCollectionId: process.env.NEXT_PUBLIC_APPRWRITE_ADMINS_COLLECTION!,
  coursesCollectionId: process.env.NEXT_PUBLIC_APPRWRITE_COURSES_COLLECTIONw!,
  filesCollectionId: process.env.NEXT_PUBLIC_APPRWRITE_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};