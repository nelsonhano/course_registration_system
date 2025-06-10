"use server";

import { Query, ID, Models } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { parseStringify } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { avatarPlaceholderUrl } from "../constants";
import { CreateAdminAccountParams, CreateStudentAccountParams, EditStudentData, Student } from "./type";
const { databases, account, users } = await createAdminClient();


// Get admin data by email
const getAdminOrAdvicorByEmail = async (email: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (e) {
    handleError(e, "Email Not Found");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const userList = await users.list([Query.equal("email", email)]);

    return userList.total > 0 ? userList.users[0] : null;
  } catch (e: any) {
      console.error("Error checking email in Auth:", e.message);
      return null;
    }
  };


const getAdminOrAdvicorUserId = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("userIdNumber", [userId])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (e) {
    handleError(e, "Email Not Found");
  }
};

const getStudentUserId = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      [Query.equal("userIdNumber", [userId])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (e) {
    handleError(e, "Email Not Found");
  }
};

// Get student data by email 
const getStudentByEmail = async (email: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (e) {
    handleError(e, "Email Not Found");
  }
};
const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const checkStudentPassword = async (password: string): Promise<boolean> => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      [Query.equal("password", password)]
    );

    // Return true if at least one student matches the password
    return result.documents.length > 0;
  } catch (e) {
    handleError(e, "Password check failed");
    return false;
  }
};

// Get student data by email 
const getAdminByEmail = async (email: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("email", [email])],
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (e) {
    handleError(e, "Email Not Found");
  }
};

export const checkAdminPassword = async (password: string): Promise<boolean> => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("password", password)]
    );

    // Return true if at least one student matches the password
    return result.documents.length > 0;
  } catch (e) {
    handleError(e, "Password check failed");
    return false;
  }
};

export const sendEmailOTP = async ({ email }: { email: string }) => {
  try {
    const session = await account.createEmailToken(ID.unique(), email);

    return session.userId;
  } catch (e) {
    handleError(e, "Failed to send email OTP");
  }
};


export const createStudentAccount = async (data: CreateStudentAccountParams) => {
  const {
    fullName,
    email,
    password,
    department,
    phoneNumber,
    userIdNumber,
  } = data;

  try {
    // Step 1: Check if Auth user exists
    const existAuthUser = await getUserByEmail(email);

    let createAuthUser: Models.User<Models.Preferences> | null = null;

    if (!existAuthUser) {
      // Step 2: Create new auth user
      createAuthUser = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
    }

    // Step 3: Get the $id
    const authId = createAuthUser?.$id || existAuthUser?.$id;
    if (!authId) throw new Error("User ID not found");

    // Step 4: If it's a new user (not just logging in an existing one), create the DB record
    let createdUser: Models.Document | null = null;

    if (createAuthUser) {
      const { databases } = await createAdminClient();

      const userData = {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        password, // ⚠️ Only store if required; best practice: do NOT save plaintext passwords
        department,
        phoneNumber,
        matricNumber: userIdNumber,
        userId: authId,
      };

      console.log("Creating student document with data:", userData);

      createdUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.studentCollectionId,
        authId,
        userData
      );

      console.log("Student document created:", createdUser.$id);
    }

    return parseStringify({ createdUser });

  } catch (error) {
    console.error("Error creating student account:", error);
    throw error;
  }
};

export const createAdminAccount = async (data: CreateAdminAccountParams) => {
  const {
    fullName,
    email,
    password,
    department,
    phoneNumber,
    role,
    userIdNumber
  } = data;

  const existingUser = await getAdminOrAdvicorByEmail(email);
  const existAuthUser = await getUserByEmail(email);

  let createAuthUser;
  if (!existAuthUser) {
    createAuthUser = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );
  };

  let createdUser;
  if (!existingUser) {
    const { databases } = await createAdminClient();

    const isAdmin = role;

    const userData = {
      fullName,
      email,
      avatar: avatarPlaceholderUrl,
      password,
      department,
      phoneNumber,
      ...(isAdmin && { staffId: userIdNumber }),
      userId: createAuthUser?.$id,
      ...(isAdmin && {role}),
    };
    
    createdUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      ID.unique(),
      userData
    );
  };

  return parseStringify({ createdUser });
};

export const verifySecret = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify({ sessionId: session.$id });
  } catch (e) {
    handleError(parseStringify(e), "Failed to verify OTP");
  }
};

// function to get user(student) data by email 
export const getCurrentUser = async () => {
  try {
    // 1. Get user session to fetch current user
    const { account } = await createSessionClient();
    const accountId = (await account.get()).$id;

    // 2. Use admin client to query the database (bypasses permissions)
    const { databases } = await createAdminClient();

    const studentResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      [Query.equal("userId", accountId)],
    );

    if (studentResult.total > 0) {
      return {
        user: studentResult.documents[0],
        role: "student",
      };
    }

    const adminResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("userId", accountId)],
    );

    if (adminResult.total > 0) {
      return {
        user: adminResult.documents[0],
        role: "admin",
      };
    }

    return null;
  } catch (err) {
    handleError(err, "❌ Failed to fetch current user");
    return null;
  }
};

// function to sign out user
export const signOutUser = async () => {
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

// function to sign in user
export const signInStudent = async ({ email, password }: { email: string, password: string }) => {
  try {
    const existingStudentByEmail = await getStudentByEmail(email);
    const checkPassword = await checkStudentPassword(password)
    const { account } = await createAdminClient();
    
    if (existingStudentByEmail && checkPassword) {
      const session = await account.createEmailPasswordSession(email, password);

      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return parseStringify({ sessionId: existingStudentByEmail.$id });
    } else {
      return parseStringify({ accountId: null, error: "User Not Found" });
    }
  } catch (e) {
    handleError(e, "Failed to Sign In User");
  }
};

export const signInAdmin = async ({ email, password }: { email: string, password: string }) => {
  try {
    const existingAdminByEmail = await getAdminByEmail(email);
    const checkPassword = await checkAdminPassword(password)
    const { account } = await createAdminClient();

    if (existingAdminByEmail && checkPassword) {
      const session = await account.createEmailPasswordSession(email, password);
      
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });

      return parseStringify({ sessionId: existingAdminByEmail.$id });
    } else {
      return parseStringify({ accountId: null, error: "User Not Found" });
    }
  } catch (e) {
    handleError(e, "Failed to Sign In User");
  }
}

// Get all course advisor
export const getAllAdvisor = async () => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("role", ["course advicer"])],
    );

    return result.total > 0 ? result.documents : null;
  } catch (e) {
    handleError(e, "Course Advicer Not Found");
  };
};

// Get a student by id
export const getStudentById = async ({ studentId }: { studentId: string }) => {
  try {
    if (!studentId) {
      throw new Error("Missing studentId in route params.");
    }

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      [Query.equal("userId", studentId)]
    );

    return result.documents[0] ?? null;
  } catch (error) {
    console.error("User ID not found:", error);
    return null;
  }
};


export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId
    );

    const students: Student[] = res.documents.map((doc) => ({
      id: doc.$id,
      fullName: doc.fullName,
      staffId: doc.staffId,
      department: doc.department,
      avatar: doc.avatar,
      matricNumber: doc.matricNumber,
      email: doc.email,
      phoneNumber: doc.phoneNumber,
    }));

    return students;
  } catch (error) {
    handleError(error, "No Student Found");
    return []
  }
};


// Get admin by id
export const getAdminById = async ({ adminId }: { adminId: string }) => {
  if (!adminId) {
    throw new Error("Admin ID is required to fetch admin data.");
  }

  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal("$id", adminId)]
    );

    return result.documents[0];
  } catch (error) {
    console.error("Failed to get admin by ID:", error);
    throw error;
  }
};


export const updateStudentDetail = async (data: EditStudentData) => {
  console.log(data);
  const { fullName, email, phoneNumber, department, matricNumber, status, level} = data;
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.studentCollectionId,
      {
        fullName,
        email,
        phoneNumber,
        department,
        matricNumber, 
        status, 
        level
      }
    )
  } catch (error) {
    
  }
  
}