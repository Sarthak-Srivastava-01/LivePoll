'use client';
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { Formik, useFormik } from 'formik'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const UpdateRoom = () => {

    const { id } = useParams();
    const [roomData, setRoomData] = useState(null)

    const fetchRoomData = async () => {
        const res = await axios.get(`http://localhost:5000/room/getbyid/${id}`);
        console.log(res.data);
        setRoomData(res.data);
    }

    useEffect(() => {
        fetchRoomData();
    }, []);

    const formSubmit = (values) => {
        console.log(values);
        axios.put(`http://localhost:5000/room/update/` + id, values)
            .then((result) => {
                toast.success('Room Updated Successfully');
            }).catch((err) => {
                console.log(err);
                console.log(err?.response?.status);
                toast.error('Something Went Wrong');
            });
    }


    return (
        <div>
            <div className='flex items-center justify-center h-screen flex-col pt-20 bg-cover bg-center h-screen'
                style={{
                    backgroundImage: 'url("/sign-up-bg.png")'
                }}>
                {
                    roomData !== null ? (
                        <Formik initialValues={roomData} onSubmit={formSubmit}>
                            {(updateForm) => {
                                return <form onSubmit={updateForm.handleSubmit}
                                    className='bg-red-600 px-5 md:px-20 py-10 w-full max-w-xl mx-5 md:mx-0'>

                                    <label htmlFor="add_room" className='text-white'>Room Name</label>
                                    <input type="text"
                                        name='name'
                                        onChange={updateForm.handleChange} value={updateForm.values.name}
                                        className='text-white my-4 px-4 py-2 w-full bg-transparent border-b-2 focus:outline-none' />
                                    {
                                        (updateForm.touched.name && updateForm.errors.name) && (
                                            <p className='text-white mb-5 text-sm'>{updateForm.errors.name}</p>
                                        )
                                    }

                                    <button type="submit"
                                        className='bg-white text-black flex items-center gap-2 justify-center py-2 mt-5 w-32 font-semibold disabled:bg-gray-600'>
                                        Submit
                                    </button>

                                </form>
                            }}
                        </Formik>
                    ) : (
                        <p className="text-center mt-10">Loading...</p>
                    )
                }
            </div>
        </div>
    )
}

export default UpdateRoom;