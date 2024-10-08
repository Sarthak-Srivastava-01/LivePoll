'use client';
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup'


const addroomSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required')
});

const ManageRoom = () => {

    const addroomForm = useFormik({
        initialValues: {
            name: ''
        },
        onSubmit: (values, { resetForm, setSubmitting }) => {
            console.log(values);
            setSubmitting(true);
            // Send values to backend

            axios.post('http://localhost:5000/room/add', values)
                .then((result) => {
                    console.log(result);
                    toast.success('Room Added Successfully');
                    resetForm();
                    fetchRooms();
                }).catch((err) => {
                    console.log(err);
                    console.log(err?.response?.status);
                    toast.error(err?.response.data.message || 'Something Went Wrong');
                    setSubmitting(false);
                });
        },
        validationSchema: addroomSchema
    })

    const [roomList, setRoomList] = useState([])

    const fetchRooms = () => {
        const res = axios.get('http://localhost:5000/room/getall')
            .then((res) => {
                console.table(res.data);
                setRoomList(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchRooms();
    }, [])

    const deleteRoom = (id) => {
        axios.delete('http://localhost:5000/room/delete/' + id)
            .then((result) => {
                toast.success('Room Deleted Successfully');
                fetchRooms();
            }).catch((err) => {
                console.log(err);
                toast.error('Something went wrong');
            });
    }


    return (
        <div>
            <div className='flex items-center justify-center h-screen flex-col pt-20 bg-cover bg-center h-screen'
                style={{
                    backgroundImage: 'url("/sign-up-bg.png")'
                }}>
                <form
                    onSubmit={addroomForm.handleSubmit}
                    className='bg-red-600 px-5 md:px-20 py-10 w-full max-w-xl mx-5 md:mx-0'>

                    <label htmlFor="add_room" className='text-white'>Room Name</label>
                    <input type="text"
                        name='name'
                        onChange={addroomForm.handleChange} value={addroomForm.values.name}
                        className='text-white my-4 px-4 py-2 w-full bg-transparent border-b-2 focus:outline-none' />
                    {
                        (addroomForm.touched.name && addroomForm.errors.name) && (
                            <p className='text-white mb-5 text-sm'>{addroomForm.errors.name}</p>
                        )
                    }

                    <button type="submit"
                        disabled={addroomForm.isSubmitting}
                        className='bg-white text-black flex items-center gap-2 justify-center py-2 mt-5 w-32 font-semibold disabled:bg-gray-600'>
                        {addroomForm.isSubmitting ? <IconLoader3 className='animate-spin' size={20} /> : <IconSend2 size={20} />}
                        Submit
                    </button>

                </form>
                <div className='w-full max-w-xl my-5 py-10'>
                    <table className='w-full bg-white'>
                        <thead className='bg-red-600'>
                            <tr className='text-white'>
                                <th className='p-2 border border-white'>Room Name</th>
                                <th className='p-2 border border-white'>Created Date</th>
                                <th colSpan={2} className='p-2 border border-white'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                roomList.map((room) => {
                                    return <tr key={room._id}>
                                        <td className='p-2 border border-red-700'>{room.name}</td>
                                        <td className='p-2 border border-red-700'>{room.createdAt}</td>
                                        <td className='p-2 border border-red-700 text-center'>
                                            <button
                                                onClick={() => deleteRoom(room._id)}
                                                className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm'>Delete</button>
                                        </td>
                                        <td className='p-2 border border-red-700 text-center text-sm'>
                                            <Link href={'/host/' + room._id} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Host</Link>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageRoom;