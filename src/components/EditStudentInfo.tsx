import React from 'react'
import AdminHeaderComponent from './AdminHeaderComponent'
import EditStudentForm from './EditStudentForm'
import { getStudentById } from '@/lib/actions/user.actions';
import { StudentType } from '@/lib/actions/type';

export default async function EditStudentInfo({ studentId }: { studentId: string }) {
  const studentDetail = await getStudentById({ studentId });

  if (!studentDetail) return <div>Student not found.</div>;

  const {
    fullName,
    email,
    phoneNumber,
    department,
    matricNumber,
    level,
    status,
  } = studentDetail;

  return (
    <div className='mx-auto items-center w-5/6'>
      <AdminHeaderComponent
        title='Edit Student Infomation'
        text='View, add, edit, and manage student records across all department.'
      />

      <EditStudentForm
        email={email}
        fullName={fullName}
        department={department}
        phoneNumber={phoneNumber}
        matricNumber={matricNumber}
        level={level as StudentType["level"]}
        status={status as StudentType["status"]}
      />
    </div>
  );
}
