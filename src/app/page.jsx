import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
      <div className='w-full px-20 pt-20 md:px-32 grid grid-cols-1 md:grid-cols-2 gap-10 py-10'>
        <div className='h-full flex flex-col justify-center gap-6'>
          <h2 className='text-4xl font-bold text-red-600'>Live Poll</h2>
          <p className='text-2xl'>Get your interactive poll created and running in simple fast and reliable way.</p>
          <div className='mt-2'>
            <Link href={'/sign-up'}
              className='bg-[#ff0000] text-white pt-2 pb-3 px-4 inline rounded-full'
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className='flex justify-center'>
          {/* src="https://static.vecteezy.com/system/resources/previews/006/159/817/non_2x/mass-survey-color-icon-social-opinion-public-poll-people-voting-agree-and-disagree-correct-and-incorrect-approve-and-disapprove-positive-negative-feedback-isolated-illustration-vector.jpg" alt="" */}
          <img
            src="/poll.png" alt=""
            className='w-full max-w-lg'
          />
        </div>
      </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 p-20 bg-red-50'>
        <div className='flex flex-col items-center justify-center'>
          <img src="/real-time-data.png" alt="" className='max-w-24' />
          <h1 className='text-xl font-semibold'>Real time Updation</h1>
        </div>
      </div>
    </div>
  )
}

export default Home