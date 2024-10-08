'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import ReactWordcloud from 'react-wordcloud';
import { io } from 'socket.io-client';

const words = [
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
]

const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [20, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
};

const Host = () => {

    const [socket, setSocket] = useState(io('http://localhost:5000', { autoConnect: false }));
    const questionRef = useRef();
    const [answerList, setAnswerList] = useState([]);

    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);

    const joinRoom = (roomName) => {
        socket.emit('join-room', roomName);
    }

    const sendQuestion = () => {
        socket.emit('send-question', { question: questionRef.current.value, room: roomData.name });
        toast.success("Question Sent");
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

    socket.on('rec-answer', answer => {
        console.log(answer);
        setAnswerList([...answerList, answer]);
    })

    const formatWordCloudData = () => {
        const words = {};

        answerList.forEach(answer => {
            if (answer in words) {
                words[answer] += 1;
            } else {
                words[answer] = 1
            }
        });

        // console.log(words);

        return Object.entries(words).map(item => {
            return { text: item[0], value: item[1] }
        })


    }

    return (
        <div>
            <div className='flex flex-col md:flex-row items-center justify-center h-screen pt-20 bg-cover bg-center bg-fixed w-full'
                style={{
                    backgroundImage: 'url("/sign-up-bg.png")'
                }}>
                <form className='bg-red-600 px-5 md:px-20 py-10 md:w-full max-w-lg mx-5 md:mx-0 rounded-lg shadow-lg'>

                    <label htmlFor="poll_ques" className='text-white'>Enter Question Here</label>
                    <textarea
                        ref={questionRef}
                        id="poll_ques"
                        className='my-4 px-4 py-2 w-full focus:outline-none rounded'
                        style={{ scrollbarWidth: "thin", scrollbarColor: "white #dc2626" }}
                        rows={3}></textarea>

                    <button type='button' className='bg-white px-5 py-2' onClick={sendQuestion}>Send Question</button>

                </form>
                <div className='w-full md:w-2/5'>
                    <ReactWordcloud options={options} words={formatWordCloudData()} />
                </div>

            </div>
        </div>
    )
}

export default Host