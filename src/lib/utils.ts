import { clsx, type ClassValue } from "clsx"
import { min } from "date-fns";
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type FormType = "sign-in" | "sign-up";

export const parseStringify = (value: unknown) =>
  JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes"; // Less than 1 KB, show in Bytes
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB"; // Less than 1 MB, show in KB
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB"; // Less than 1 GB, show in MB
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB"; // 1 GB or more, show in GB
  }
};

export const formatDateTime = (isoString: string | null | undefined) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  // Get hours and adjust for 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  // Format the time and date parts
  const time = `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];

  return `${time}, ${day} ${month}`;
};

// APPWRITE URL UTILS
// Construct appwrite file URL - https://appwrite.io/docs/apis/rest#images
export const constructFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

export const constructDownloadUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
};

// DASHBOARD UTILS
export const getUsageSummary = (totalSpace: any) => {
  return [
    {
      title: "Documents",
      size: totalSpace.document.size,
      latestDate: totalSpace.document.latestDate,
      icon: "/assets/icons/file-document-light.svg",
      url: "/documents",
    },
    {
      title: "Images",
      size: totalSpace.image.size,
      latestDate: totalSpace.image.latestDate,
      icon: "/assets/icons/file-image-light.svg",
      url: "/images",
    },
    {
      title: "Media",
      size: totalSpace.video.size + totalSpace.audio.size,
      latestDate:
        totalSpace.video.latestDate > totalSpace.audio.latestDate
          ? totalSpace.video.latestDate
          : totalSpace.audio.latestDate,
      icon: "/assets/icons/file-video-light.svg",
      url: "/media",
    },
    {
      title: "Others",
      size: totalSpace.other.size,
      latestDate: totalSpace.other.latestDate,
      icon: "/assets/icons/file-other-light.svg",
      url: "/others",
    },
  ];
};


export const returnAdminTypes = (type: string, path?: string) => {
  return { type, path }
}

export const authFormSchema = (isAdmin: boolean) => {
  return z
    .object({
      email: z.string().email(),
      fullName: z.string().min(2).max(50),
      phoneNumber: z.string().min(7).max(15),
      ...(isAdmin 
        ? { 
          departmentOrUnit: z.string(),
          staffId: z.string().min(5).max(20),
          role: z.enum(["admin", "course advicer"])
        }
        : { 
          department: z.string().min(2), 
          matricNumber: z.string().min(5).max(20)
        }
      ),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
};
export const broadCastFormSchema = () => {
  return z.object({
    title: z.string().min(4, "input must be minimum of 4 characters").max(40,"input must be not beabove 40 characters"),
    message: z.string().min(10, "input must be minimum of 10 characters").max(1000, "input must be not beabove 1000 characters"),
    permission: z.enum(["student", "non-student"])
  })
};

export const academiSessionFormSchema = () => {
  return z.object({
    sessionTitle: z.string().max(20),
    semester: z.enum(["first semester", "second semester"]),
    endDate: z.string().max(20),
    startDate: z.string().max(20),

  })
};


export const editStudentAuth = z.object({
  fullName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  department: z.string(),
  matricNumber: z.string(),
  status: z.enum(["active", "inactive"]),
  gender: z.enum(["female", "male"]),
  level: z.enum(["100" , "200", "300", "400", "500"]),
});

export const uploadCourseFormSchema = () => {
  return z.object({
    department: z.string().min(3, "input must be greater than 2 characters").max(20, "input must not be greater than 20 characters"),
    level: z.enum(["100 level", "200 level", "300 level", "400 level", "500 level"]),
    semester: z.enum(["first semester", "second semester"]),
    session: z.string(),
    courseCode: z.string().min(3, "input must be greater than 2 characters").max(10, "input must not be greater than 10 characters"),
    courseTitle: z.string().min(3, "input must be greater than 2 characters").max(50, "input must not be greater than 50 characters"),
    unit: z.coerce.number().min(1, "course unit must be grater than zero").max(8, "course unit must not be grater than 8 unit"),
  });
}

export const advicorFormSchema = () => {
        return z.object({
            selectAdvicor: z.string(),
            selectLevel: z.enum(["100", "200","300","400","500"]),
            selectDepartment: z.enum(
              [
                "Agricultural Extension & Communication Technology",
                "Agricultural & Resource Economics",
                "Animal Production & Health",
                "Crop, Soil & Pest Management",
                "Fisheries & Aquaculture Technology",
                "Food Science & Technology",
                "Forestry & Wood Technology",
                "Ecotourism & Wildlife Management",
                "Agricultural Engineering",
                "Civil Engineering",
                "Computer Engineering",
                "Electrical & Electronics Engineering",
                "Industrial & Production Engineering",
                "Mechanical Engineering",
                "Metallurgical & Materials Engineering",
                "Mining Engineering",
                "Applied Geology",
                "Applied Geophysics",
                "Meteorology",
                "Marine Science & Technology",
                "Remote Sensing & Geoscience Information Systems",
                "Architecture",
                "Building",
                "Estate Management",
                "Industrial Design",
                "Quantity Surveying",
                "Surveying & Geoinformatics",
                "Urban & Regional Planning",
                "Accounting",
                "Business Administration",
                "Economics",
                "Entrepreneurship Management Technology",
                "Project Management Technology",
                "Transport Management Technology",
                "Computer Science",
                "Cyber Security",
                "Information & Communication Technology",
                "Information Systems",
                "Information Technology",
                "Software Engineering",
                "Biochemistry",
                "Biology",
                "Biotechnology",
                "Microbiology",
                "Chemistry",
                "Mathematics",
                "Physics",
                "Statistics",
                "Anatomy",
                "Biomedical Technology",
                "Physiology",
              ],
            ),
        });
    };

export const getFileTypesParams = (type: string) => {
  switch (type) {
    case "documents":
      return ["document"];
    case "images":
      return ["image"];
    case "media":
      return ["video", "audio"];
    case "others":
      return ["other"];
    default:
      return ["document"];
  }
};
