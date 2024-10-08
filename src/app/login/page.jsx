'use client';
import React from 'react'
import { IconLoader3, IconSend2 } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string().required('Password is required')
})

const Login = () => {
  
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, {setSubmitting}) => {
      console.log(values);
      setSubmitting(true);
      axios.post('http://localhost:5000/user/authenticate', values)
        .then((result) => {
          console.log(result.data);
          localStorage.setItem('token', result.data.token);
          toast.success('Login Successful');
          setSubmitting(false);
        }).catch((err) => {
          console.log(err);
          console.log(err?.response?.status);          
          toast.error('Login Failed')
          setSubmitting(false);
        });
    },
    validationSchema: loginSchema
  })

  return (
    <div
      className="flex justify-center items-center bg-cover bg-center h-screen"
      style={{
        backgroundImage: 'url("/sign-up-bg.png")'
      }}
    >

      <div className='w-full max-w-2xl grid grid-cols-1 mx-5 md:mx-0 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='py-10 px-6 bg-[#ff0000] text-white'>
          <h1 className='text-center font-bold text-lg'>Login</h1>
          <form className='pt-5' onSubmit={loginForm.handleSubmit}>

            <label htmlFor="email">Email</label>
            <input type="email" id='email'
              onChange={loginForm.handleChange} value={loginForm.values.email}
              className='w-full px-2 py-1 mb-2 bg-transparent border-b-2 focus:outline-none' />
            {
              (loginForm.touched.email && loginForm.errors.email) && (
                <p className='text-white mb-5 text-sm'>{loginForm.errors.email}</p>
              )
            }

            <label htmlFor="password">Password</label>
            <input type="password" id='password'
              onChange={loginForm.handleChange} value={loginForm.values.password}
              className='w-full px-2 py-1 mb-2 bg-transparent border-b-2 focus:outline-none' />
            {
              (loginForm.touched.password && loginForm.errors.password) && (
                <p className='text-white mb-5 text-sm'>{loginForm.errors.password}</p>
              )
            }

            <button type="submit"
              disabled={loginForm.isSubmitting}
              className='bg-white text-black flex items-center gap-2 justify-center py-2 mt-5 w-full font-semibold disabled:bg-gray-600'>
              {loginForm.isSubmitting ? <IconLoader3 className='animate-spin' size={20} /> : <IconSend2 size={20} />}
              Submit
            </button>

            <p className='pt-2'>
              New here?
              <Link href={'/login'}>
                &nbsp; Signup now
              </Link>
            </p>

          </form>
        </div>
        <div className='hidden md:flex items-center'>
          <img src="../sign-in.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Login