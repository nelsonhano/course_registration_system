type CreateAdminAccountParams = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string | undefined;
  department?: string; // optional
  departmentOrUnit?: string; // also optional
  userIdNumber: string;
};

export interface CreateStudentAccountParams {
  fullName: string;
  email: string;
  password: string;
  department: string;
  phoneNumber: string;
  userIdNumber: string; // matricNumber
}

type CourseParams = {
  courseCode: string;
  courseTitle: string;
  department: string;
  level: string;
  semester: string;
  session: string;
  unit: number;
}

type BroadcastParams = {
  title: string, message: string, permission: string
}

export declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


interface Student {
  id: string;
  fullName: string;
  staffId: string;
  department: string;
  avatar: string;
  matricNumber: string;
  email: string;
  phoneNumber: string;
}
