'use client'
import { postStetus } from '@/Redux-Toolkit/PostSlic'
import { RootState } from '@/Redux-Toolkit/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../css/app.css'
import { CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import axios, { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'
import { ApiResposnse } from '@/Types/Apires'
import { ToastAction } from '@radix-ui/react-toast'
import { singleboderStetus } from '@/Redux-Toolkit/SinglaBorde'
import { Loader2 } from 'lucide-react'

export default function PostSec() {

    const selctor = useSelector((data: RootState) => data.postStetus.value)
    const dispatch = useDispatch()
    const crossposthandler = () => {
        dispatch(postStetus(false))
    }


    const [isVideo, setIsVideo] = useState(false);
    let [sendiMg, setsendiMg] = useState<any[]>([]);

    const iamgePrev = (event: any) => {
        let imgFile = event.target;
        let file = imgFile.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e: any) {
            const obj = {
                imgpath: file,
                bufferData: e.target.result
            }
            setsendiMg((sendiMg: any) => [...sendiMg, obj])

            setIsVideo(file.type.startsWith('video/'));
        };
    };

    const iamkgePrev = (event: any) => {
        let imgFile = event.target;
        let file = imgFile.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (e: any) {
            const obj = {
                imgpath: file,
                bufferData: e.target.result
            }

            setsendiMg((sendiMg: any) => [...sendiMg, obj])
        };
    }

    //     sendiMg = sendiMg.filter((v) => {
    //         return v !== a
    //     })


    //     // setAllImg(allImg)
    //     // console.log(a)
    //     // sendiMg.map((v) => {
    //     //   console.log(v.imgpath)
    //     // })
    // }
    // useEffect(() => {
    //     jasja()
    // }, [])
    // useEffect(() => {
    //     if (prev) {
    //         setAllImg((prevAllImg) => [...prevAllImg, prev]);

    //     }

    // }, [prev]);







    //
    const rsiser = [
        {
            id: 1,
            con: 'Original',

        },
        {
            id: 2,
            con: '1.1',

        },
        {
            id: 3,
            con: '4.5',

        },
        {
            id: 4,
            con: '16.9',

        }
    ]

    const [ids, setids] = useState(1)
    const [divBox, stedivbox] = useState(false);

    const togal = (id: any) => {
        setids(id)
    }

    const diivhandler = () => {
        stedivbox((divBox) => !divBox)
    }
    const diivhandsjler = () => {
        stedivbox(false)
    }

    const [jkad, setksdn] = useState(false)

    const provehiasj = () => {
        setksdn(!jkad)
    }
    const kl = () => {
        setsendiMg([])
        setksdn(false)

    }

    const postdelethandler: any = (data: any) => {
        sendiMg = sendiMg.filter((v: any) => v.bufferData !== data)
        setsendiMg(sendiMg)
    }
    useEffect(() => {
        postdelethandler()
    }, [])


    const [isloder, setisloder] = useState(false)
    useEffect(() => {
        dispatch(singleboderStetus(isloder));

    }, [isloder, dispatch]);
    const onsubmit = async (e: any) => {
        e.preventDefault()
        const formdata = new FormData()
        sendiMg.map((v: any, i) => {
            formdata.append('file', v.imgpath)
        })
        try {
            setisloder(true)
            const response = await axios.post(`/api/post`, formdata)

            toast({
                description: response.data.message,
                className: "success"
            })


            setsendiMg([])
            setksdn(false)


        } catch (error) {
            const axiosError = error as AxiosError<ApiResposnse>
            const errorMessage = axiosError.response?.data.message ?? 'Error checking username.'
            toast({
                description: errorMessage,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                className: "wrong"
            })

        } finally {
            setisloder(false)
        }
    }

    return (
        <>

            <div onClick={() => setksdn(false)} className={`w-full min-h-screen postBlur fixed  top-0 left-0 duration-[.5s] z-[9999999] ${jkad ? ' opacity-[1] visible ' : 'opacity-0 invisible'}`}></div>
            <div className={`rounded-lg shadow-md max-w-md md:w-full w-[300px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999999] bg-white overflow-hidden  duration-[.5s] ${jkad ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`}>
                <div className='py-[15px]'>
                    <h1 className='text-center w-full font-bold'>Discard post?</h1>
                    <p className='text-center w-full text-[#737373] mt-[10px] text-[14px]'>If you leave, your edits won't be saved.</p>
                </div>
                <div className='post2 '></div>
                <div className=''>

                    <div onClick={kl} className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]'><p className='text-red-500 text-center w-full font-bold'>Discard</p>
                    </div>
                    <div className='post2'></div>
                    <div onClick={() => setksdn(false)} className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]'><p className='text-center w-full'>Cancel</p>
                    </div>

                </div>
            </div>
            {sendiMg && sendiMg.length > 0 && sendiMg[0]?.bufferData && sendiMg[0].bufferData !== '' ? <div onClick={() => setksdn(true)} className={`w-full min-h-screen postBlur fixed  top-0 left-0 duration-[.5s] z-[9999]`}></div> : <div onClick={crossposthandler} className={`w-full min-h-screen postBlur fixed top-0 left-0 z-[99]  flex justify-center items-center duration-[.5s] ${selctor ? ' opacity-[1] visible ' : 'opacity-0 invisible'}`}>

            </div>}


            {
                isloder ?
                    <div className={`rounded-lg shadow-md md:w-[511px] flex justify-center items-center w-[300px] h-[610px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'> <div>
                        <div className="db-spinner"></div>
                    </div> </div>

                    :
                    <form action="" onSubmit={onsubmit}>

                        {sendiMg && sendiMg.length > 0 && sendiMg[0]?.bufferData && sendiMg[0].bufferData !== '' ? (
                            isVideo ? (

                                <div className={`rounded-lg shadow-md md:w-[511px]  w-[300px] h-[610px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>
                                    <div className='flex p-[10px]'>
                                        <svg onClick={provehiasj} className=' cursor-pointer' aria-label="Back" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                                        <h3 className='w-full text-center font-bold'>Crop</h3>
                                        <button className=' cursor-pointer text-[blue] hover:text-black' type='submit'>Next</button>

                                    </div>
                                    <div className='post2 '></div>

                                    {
                                        sendiMg && sendiMg.length >= 2
                                            ?
                                            <Carousel>
                                                <CarouselContent>
                                                    {sendiMg.map((v, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className={`w-full flex justify-center items-center h-[510px] relative overflow-hidden`}

                                                                onClick={diivhandsjler}>
                                                                <span className=' absolute  cursor-pointer  top-0 right-2 text-[50px] z-[9999999] text-black ' onClick={() => postdelethandler(v.bufferData)}>&times;</span>


                                                                <CardContent className="flex aspect-square items-center justify-center p-6">

                                                                    <video
                                                                        src={v.bufferData}
                                                                        autoPlay
                                                                        className={`absolute md:object-cover cursor-grab ${(ids == 1) ? `w-[60%] h-full left-[50%] translate-x-[-50%]  ` : ids == 2 ? "w-full h-full " : ids == 3 ? 'w-[56%] h-full' : ids == 4 ? 'w-full h-[60%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : ''} `}
                                                                    ></video>



                                                                </CardContent>

                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent >
                                                <CarouselPrevious className=' left-0' type='button' />
                                                <CarouselNext className=' right-0' type='button' />
                                            </Carousel>

                                            :

                                            <div className={`w-full flex justify-center items-center h-[510px] relative overflow-hidden`}

                                                onClick={diivhandsjler}>





                                                <video
                                                    src={sendiMg[0].bufferData}
                                                    autoPlay
                                                    className={`absolute object-cover cursor-grab ${(ids == 1) ? `w-[56%] h-full left-[50%] translate-x-[-50%]  ` : ids == 2 ? "w-full h-full " : ids == 3 ? 'w-[56%] h-full' : ids == 4 ? 'w-full h-[55%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : ''} `}
                                                ></video>





                                            </div>
                                    }



                                    <div className='post2'></div>
                                    <div className=' flex justify-between p-[10px] relative'>
                                        <div className={`w-[118px] h-[195px] postBlur absolute bottom-[105%] left-[0px] ${divBox ? 'block' : 'hidden'}`}>
                                            {
                                                rsiser.map((v, i) => {
                                                    return (
                                                        <div className='px-[10px] py-[12px] cursor-pointer' style={{ borderBottom: '2px white solid' }} key={i} onClick={() => togal(v.id)}>
                                                            <div className={` flex justify-between items-center  ${ids == v.id ? 'text-white' : 'text-[gray]'}`} >
                                                                <p>{v.con} </p>
                                                                {(v.id == 1) ?
                                                                    <svg aria-label="Photo outline icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> : (v.id == 2) ?
                                                                        <svg aria-label="Crop square icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                        :
                                                                        (v.id == 3) ?
                                                                            <svg aria-label="Crop portrait icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                            :
                                                                            (v.id == 4) ?
                                                                                <svg aria-label="Crop landscape icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 20H5a4.004 4.004 0 0 1-4-4V8a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v8a4.004 4.004 0 0 1-4 4ZM5 6a2.002 2.002 0 0 0-2 2v8a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                                :
                                                                                ''
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }



                                        </div>


                                        <div onClick={diivhandler} className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                            <svg aria-label="Select crop" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path></svg>
                                        </div>
                                        <div className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                            <svg aria-label="Select zoom" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z"></path></svg>
                                        </div>
                                        <label htmlFor="zkd">
                                            <div className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                                <input type="file" className=' hidden' id='zkd' accept="video/*" name='thirdinut' onChange={(e) => iamkgePrev(e)} />

                                                <svg aria-label="Open media gallery" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z" fillRule="evenodd"></path></svg>


                                            </div>
                                        </label>
                                    </div>


                                </div>
                            ) : (

                                <div className={`rounded-lg shadow-md md:w-[511px]  w-[300px] h-[610px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>
                                    <div className='flex p-[10px]'>
                                        <svg onClick={provehiasj} className=' cursor-pointer' aria-label="Back" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="2.909" x2="22.001" y1="12.004" y2="12.004"></line><polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polyline></svg>
                                        <h3 className='w-full text-center font-bold'>Crop</h3>
                                        <button className=' cursor-pointer text-[blue] hover:text-black' type='submit'>Next</button>

                                    </div>
                                    <div className='post2 '></div>

                                    {
                                        sendiMg && sendiMg.length >= 2
                                            ?
                                            <Carousel>
                                                <CarouselContent>
                                                    {sendiMg.map((v, index) => {
                                                        // console.log(index)
                                                        return (
                                                            <CarouselItem key={index}>
                                                                <div className={`w-full flex justify-center items-center h-[510px] relative overflow-hidden`}

                                                                    onClick={diivhandsjler}>
                                                                    <span className=' absolute  cursor-pointer  top-0 right-2 text-[50px] z-[9999999] text-black ' onClick={() => postdelethandler(v.bufferData)}>&times;</span>


                                                                    <CardContent className="flex aspect-square items-center justify-center p-6">

                                                                        <img
                                                                            src={v.bufferData}
                                                                            alt='Preview'
                                                                            className={`absolute object-cover cursor-grab ${(ids == 1) ? `w-[80%] h-full left-[50%] translate-x-[-50%]  ` : ids == 2 ? "w-full h-full " : ids == 3 ? 'w-[85%] h-full' : ids == 4 ? 'w-full h-[55%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : ''} `}
                                                                        />



                                                                    </CardContent>

                                                                </div>
                                                            </CarouselItem>
                                                        )


                                                    })}
                                                </CarouselContent >
                                                <CarouselPrevious className=' left-0' type='button' />
                                                <CarouselNext className=' right-0' type='button' />
                                            </Carousel>

                                            :

                                            <div className={`w-full flex justify-center items-center h-[510px] relative overflow-hidden`}

                                                onClick={diivhandsjler}>





                                                <img
                                                    src={sendiMg[0].bufferData}
                                                    alt='Preview'
                                                    className={`absolute object-cover cursor-grab ${(ids == 1) ? `w-[80%] h-full left-[50%] translate-x-[-50%]  ` : ids == 2 ? "w-full h-full " : ids == 3 ? 'w-[85%] h-full' : ids == 4 ? 'w-full h-[55%] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]' : ''} `}
                                                />





                                            </div>
                                    }



                                    <div className='post2'></div>
                                    <div className=' flex justify-between p-[10px] relative'>
                                        <div className={`w-[118px] h-[195px] postBlur absolute bottom-[105%] left-[0px] ${divBox ? 'block' : 'hidden'}`}>
                                            {
                                                rsiser.map((v, i) => {
                                                    return (
                                                        <div className='px-[10px] py-[12px] cursor-pointer' style={{ borderBottom: '2px white solid' }} key={i} onClick={() => togal(v.id)}>
                                                            <div className={` flex justify-between items-center  ${ids == v.id ? 'text-white' : 'text-[gray]'}`} >
                                                                <p>{v.con} </p>
                                                                {(v.id == 1) ?
                                                                    <svg aria-label="Photo outline icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z" fillRule="evenodd"></path><path d="m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg> : (v.id == 2) ?
                                                                        <svg aria-label="Crop square icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 23H5a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM5 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                        :
                                                                        (v.id == 3) ?
                                                                            <svg aria-label="Crop portrait icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16 23H8a4.004 4.004 0 0 1-4-4V5a4.004 4.004 0 0 1 4-4h8a4.004 4.004 0 0 1 4 4v14a4.004 4.004 0 0 1-4 4ZM8 3a2.002 2.002 0 0 0-2 2v14a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V5a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                            :
                                                                            (v.id == 4) ?
                                                                                <svg aria-label="Crop landscape icon" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M19 20H5a4.004 4.004 0 0 1-4-4V8a4.004 4.004 0 0 1 4-4h14a4.004 4.004 0 0 1 4 4v8a4.004 4.004 0 0 1-4 4ZM5 6a2.002 2.002 0 0 0-2 2v8a2.002 2.002 0 0 0 2 2h14a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2Z"></path></svg>
                                                                                :
                                                                                ''
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }



                                        </div>


                                        <div onClick={diivhandler} className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                            <svg aria-label="Select crop" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M10 20H4v-6a1 1 0 0 0-2 0v7a1 1 0 0 0 1 1h7a1 1 0 0 0 0-2ZM20.999 2H14a1 1 0 0 0 0 2h5.999v6a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z"></path></svg>
                                        </div>
                                        <div className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                            <svg aria-label="Select zoom" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="m22.707 21.293-4.825-4.825a9.519 9.519 0 1 0-1.414 1.414l4.825 4.825a1 1 0 0 0 1.414-1.414ZM10.5 18.001a7.5 7.5 0 1 1 7.5-7.5 7.509 7.509 0 0 1-7.5 7.5Zm3.5-8.5h-2.5v-2.5a1 1 0 1 0-2 0v2.5H7a1 1 0 1 0 0 2h2.5v2.5a1 1 0 0 0 2 0v-2.5H14a1 1 0 0 0 0-2Z"></path></svg>
                                        </div>
                                        <label htmlFor="zkd">
                                            <div className='w-[32px] h-[32px] bg-[#666D7C] hover:bg-[#7c828f] flex justify-center items-center rounded-[50%] cursor-pointer'>
                                                <input type="file" className=' hidden' id='zkd' accept="image/*" name='secoirstinut' onChange={(e) => iamkgePrev(e)} />

                                                <svg aria-label="Open media gallery" className=' text-white' fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 15V5a4.004 4.004 0 0 0-4-4H5a4.004 4.004 0 0 0-4 4v10a4.004 4.004 0 0 0 4 4h10a4.004 4.004 0 0 0 4-4ZM3 15V5a2.002 2.002 0 0 1 2-2h10a2.002 2.002 0 0 1 2 2v10a2.002 2.002 0 0 1-2 2H5a2.002 2.002 0 0 1-2-2Zm18.862-8.773A.501.501 0 0 0 21 6.57v8.431a6 6 0 0 1-6 6H6.58a.504.504 0 0 0-.35.863A3.944 3.944 0 0 0 9 23h6a8 8 0 0 0 8-8V9a3.95 3.95 0 0 0-1.138-2.773Z" fillRule="evenodd"></path></svg>


                                            </div>
                                        </label>
                                    </div>


                                </div>

                            )
                        ) : (
                            <div className={` rounded-lg shadow-md max-w-md md:w-full w-[300px] h-[450px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>

                                <h3 className=' w-full text-center font-bold mt-[10px]'>Create new post</h3>


                                <div className='post2 mt-4'></div>
                                <div className=' flex justify-center items-center flex-col h-full gap-5'>

                                    <>
                                        <svg aria-label="Icon to represent media such as images or videos" fill="currentColor" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>

                                        <h1>Drag photos and videos here</h1>



                                        <input type="file" id='kajs' className='hidden' accept="image/*,video/*" name='firstinut' onChange={(e) => iamgePrev(e)} />
                                        <label htmlFor='kajs' className='bg-[#1877F2] px-[16px] py-[5px] text-white text-[14px] cursor-pointer' style={{ borderRadius: "8px" }}>Select from computer / phone</label>
                                    </>


                                </div>
                            </div>
                        )}

                    </form>
            }






        </>


    )
}
