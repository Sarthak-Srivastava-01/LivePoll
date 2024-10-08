'use client';
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import axios from 'axios';
import { useFormik } from 'formik'
import Link from 'next/link';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup'

const signupSchema = Yup.object().shape({
  full_name: Yup.string().required('Name is Required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain an lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[\W]/, 'Password must contain a special character'),
  confirmPassword: Yup.string().required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignUp = () => {

  const signupForm = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(values);
      setSubmitting(true);
      // Send values to backend

      axios.post('http://localhost:5000/user/add', values)
        .then((result) => {
          console.log(result);
          toast.success('User Registered Successfully')
          resetForm();
        }).catch((err) => {
          console.log(err);
          console.log(err?.response?.status);
          toast.error(err?.response.data.message || 'Something Went Wrong');
          setSubmitting(false);
        });
    },
    validationSchema: signupSchema
  })

  return (
    <div
      className="flex justify-center items-center bg-cover bg-center h-screen"
      style={{
        backgroundImage: 'url("/sign-up-bg.png")'
      }}
    >

      <div className='w-full max-w-2xl grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='hidden md:flex items-center'>
          <img src="../sign-up.png" alt="" />
        </div>
        <div className='py-10 px-6 bg-[#ff0000] text-white'>
          <h1 className='text-center font-bold text-lg'>Sign Up</h1>
          <form className='pt-5' onSubmit={signupForm.handleSubmit}>

            <label htmlFor="full_name">Full name</label>
            <input type="text" id='full_name'
              onChange={signupForm.handleChange} value={signupForm.values.full_name}
              className='w-full px-2 py-1 mb-2 bg-transparent border-b-2 focus:outline-none' />
            {
              (signupForm.touched.full_name && signupForm.errors.full_name) && (
                <p className='text-white mb-5 text-sm'>{signupForm.errors.full_name}</p>
              )
            }

            <label htmlFor="email">Email</label>
            <input type="email" id='email'
              onChange={signupForm.handleChange} value={signupForm.values.email}
              className='w-full px-2 py-1 mb-2 bg-transparent border-b-2 focus:outline-none' />
            {
              (signupForm.touched.email && signupForm.errors.email) && (
                <p className='text-white mb-5 text-sm'>{signupForm.errors.email}</p>
              )
            }

            <label htmlFor="password">Password</label>
            <input type="password" id='password'
              onChange={signupForm.handleChange} value={signupForm.values.password}
              className='w-full px-2 py-1 mb-2 bg-transparent border-b-2 focus:outline-none' />
            {
              (signupForm.touched.password && signupForm.errors.password) && (
                <p className='text-white mb-5 text-sm'>{signupForm.errors.password}</p>
              )
            }

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id='confirmPassword'
              onChange={signupForm.handleChange} value={signupForm.values.confirmPassword}
              className='w-full px-2 py-1 bg-transparent border-b-2 focus:outline-none' />
            {
              (signupForm.touched.confirmPassword && signupForm.errors.confirmPassword) && (
                <p className='text-white mb-5 text-sm'>{signupForm.errors.confirmPassword}</p>
              )
            }

            <button type="submit"
              disabled={signupForm.isSubmitting}
              className='bg-white text-black flex items-center gap-2 justify-center py-2 mt-5 w-full font-semibold disabled:bg-gray-600'>
              {signupForm.isSubmitting ? <IconLoader3 className='animate-spin' size={20} /> : <IconSend2 size={20} />}
              Submit
            </button>

            <p className='pt-2'>
              Already a member?
              <Link href={'/login'}>
                &nbsp; Login here
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp