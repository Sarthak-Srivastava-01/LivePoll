'use client';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const Poll = () => {

    const [socket, setSocket] = useState(io('http://localhost:5000', { autoConnect: false }));
    const responseRef = useRef();
    const [question, setQuestion] = useState('');

    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);

    const joinRoom = (roomName) => {
        socket.emit('join-room', roomName);
    }
    
    const sendAnswer = () => {
        socket.emit('send-answer', {answer: responseRef.current.value.toLowerCase(), room: roomData.name})
        toast.success("Answer Sent");
    }


    const fetchRoomData = async () => {
        const res = await axios.get('http://localhost:5000/room/getbyid/' + id)
        console.log(res.data);
        setRoomData(res.data);
        joinRoom(res.data.name);
    }

    useEffect(() => {
        socket.connect();
        fetchRoomData();
    }, [])

    socket.on('rec-question', question => {
        setQuestion(question);
    });


    return (
        <div>
            <div className='flex items-center justify-center h-screen flex-col pt-20 bg-cover bg-center h-screen'
                style={{
                    backgroundImage: 'url("/sign-up-bg.png")'
                }}>
                <div className='flex bg-white px-5 md:px-20 py-10 md:w-full max-w-xl mx-5 md:mx-0 rounded-t-lg shadow-lg text-[#f00] font-semibold text-lg'>
                    <span className='pr-2'>Ques: </span>
                    <p>{question}</p>
                </div>
                <form className='bg-red-600 px-5 md:px-20 py-10 md:w-full max-w-xl mx-5 md:mx-0 rounded-b-lg shadow-lg'>

                    <label htmlFor="poll_ques" className='text-white'>Write Answer Here</label>
                    <textarea
                        ref={responseRef}
                        id="poll_ques"
                        className='my-4 px-4 py-2 w-full focus:outline-none rounded'
                        style={{ scrollbarWidth: "thin", scrollbarColor: "white #dc2626" }}
                        rows={3}></textarea>

                    <button type='button' className='bg-white px-5 py-2' onClick={sendAnswer}>Send Answer</button>

                </form>
            </div>
        </div>
    )
}

export default Poll