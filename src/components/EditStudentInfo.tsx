import React from 'react'
import AdminHeaderComponent from './AdminHeaderComponent'
import EditStudentForm from './EditStudentForm'
import { getStudentById } from '@/lib/actions/user.actions';
import { StudentType } from '@/lib/actions/type';

export default async function EditStudentInfo({ studentId, adminId }: { studentId: string, adminId: string }) {
  const studentDetail = await getStudentById({ studentId });

  if (!studentDetail) return <div>Student not found.</div>;
console.log({studentDetail});

  const {
    userId,
    fullName,
    email,
    phoneNumber,
    department,
    matricNumber,
    level,
    gender,
    status,
  } = studentDetail;

  return (
    <div className='mx-auto items-center w-5/6'>
      <AdminHeaderComponent
        title='Edit Student Infomation'
        text='View, add, edit, and manage student records across all department.'
      />

      <EditStudentForm
        adminId={adminId}
        email={email}
        userId={userId}
        fullName={fullName}
        department={department}
        phoneNumber={phoneNumber}
        matricNumber={matricNumber}
        level={level as StudentType["level"]}
        gender={gender as StudentType["gender"]}
        status={status as StudentType["status"]}
      />
    </div>
  );
}
