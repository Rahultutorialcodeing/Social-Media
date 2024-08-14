'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../../css/app.css'
import { useForm } from 'react-hook-form'
import { signUpSchema } from '@/Schema/SignUp-Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react'
import { ApiResposnse } from '@/Types/Apires'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { useDispatch } from 'react-redux'
import { boderStetus } from '@/Redux-Toolkit/BorderSclice'
import { useRouter } from 'next/navigation'
import { emailStetus } from '@/Redux-Toolkit/EmailSlice'

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
    let [showpass, setshowPassword] = useState(false)
    let showpassHandler = () => {
        setshowPassword((showpass) => !showpass)
    }

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)   // Use zodResolver with your schema

    })



    let watchTime = watch('userPassword', '');
    let [passwordInput, setPasswordInput] = useState(false);


    useEffect(() => {
        if (watchTime.length >= 1) {
            setPasswordInput(true);
        } else {
            setPasswordInput(false); // You might want to handle the case when the length is less than 1
        }
    }, [watchTime]); // Include watchTime in the dependency array

    const username = watch('userName', '')
    const [userNameeorror, setuserNameeorror] = useState('')
    const [isCheckingUsername, setisCheckingUsername] = useState(false)
    const UsernameVallidation = async () => {
        try {
            setisCheckingUsername(true)
            let response = await axios.post(`/api/username-vallidation?username=${username}`)
            setuserNameeorror(response.data.message)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResposnse>
            const errorMessage = axiosError.response?.data.message ?? 'Error checking username.'
            toast({
                description: errorMessage,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                className: "wrong"
            })

        } finally {
            setisCheckingUsername(false)
        }
    }
    useEffect(() => {
        if (username.length >= 1) {
            UsernameVallidation()
        } else {
            setuserNameeorror('')
        }

    }, [username, userNameeorror])

    const router = useRouter()
    const [isloder, setisloder] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(boderStetus(isloder));

    }, [isloder, dispatch]);
    const onsubmit = async (data: SignUpFormData) => {
        try {
            setisloder(true)
            const response = await axios.post('/api/sign-up', data)
            toast({
                description: response.data.message,
                className: "success"
            })

            reset()
            dispatch(emailStetus(response.data.datauseremail));
            router.push(`/verify/${response.data.datausername}`)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResposnse>
            const errorMessage = axiosError.response?.data.message ?? 'An occupy error.'
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
        <div className="flex justify-center items-center min-h-screen py-[20px] px-[12px] bg-white" >

            <div className="p-8 rounded-lg shadow-md w-full max-w-md" id='register'>
                <div className="mb-6 text-center">
                    <i data-visualcompletion="css-img" aria-label="Instagram" role="img" className='acountLogo'></i>
                    <h2 className='text-[#737373] font-[600]'>Sign up to see photos and videos <br /> from your friends.</h2>
                </div>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Username</label>
                        <div className='relative'>
                            <input type="text" id='username' {...register('userName')} className="p-[6px] w-[100%] rounded-[5px] all-singup-input" placeholder='' autoComplete='' data-fdprocessedid="jjyzm" />
                            <span className=' absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]'>Username</span>
                        </div>
                        {
                            errors.userName ?
                                <p className="text-[red]">{errors.userName.message}</p>
                                :
                                <>
                                    {
                                        isCheckingUsername ?
                                            <p className="text-[black]">Checking.....</p>
                                            :
                                            <>
                                                {
                                                    userNameeorror == 'Username is already taken.' ?
                                                        <p className="text-[red]">{userNameeorror}</p>
                                                        :
                                                        <p className="text-[green]">{userNameeorror}</p>
                                                }
                                            </>
                                    }

                                </>

                        }

                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Email</label>
                        <div className='relative'>
                            <input type="text" id='email' {...register('userEmail')} className="p-[6px] w-[100%] rounded-[5px] all-singup-input" placeholder='' autoComplete='' data-fdprocessedid="ijs" />
                            <span className=' absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]'>Email</span>
                        </div>
                        {errors.userEmail && <p className="text-[red]">{errors.userEmail.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Full Name</label>
                        <div className='relative'>
                            <input type="text" id='fullName' {...register('userFullName')} className="p-[6px] w-[100%] rounded-[5px] all-singup-input" placeholder='' autoComplete='' data-fdprocessedid="jks" />
                            <span className=' absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]'>Fulll Name</span>
                        </div>
                        {errors.userFullName && <p className="text-[red]">{errors.userFullName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Password</label>
                        <div className='relative'>
                            <input type={`${showpass ? 'text' : 'password'}`} {...register('userPassword')} id='password' className={`p-[6px] w-[100%]  rounded-[5px] all-singup-input `} placeholder='' autoComplete='' data-fdprocessedid="kjkd" />
                            <span className={`absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292] `}>Password</span>
                            {
                                passwordInput ?
                                    <>

                                        {
                                            showpass ?
                                                <div className='hidepass absolute right-[6px] top-[50%] w-[16px] h-[16px] translate-y-[-50%] cursor-pointer' onClick={showpassHandler}></div>

                                                :
                                                <div className='showpass absolute right-[6px] top-[50%] w-[16px] h-[16px] translate-y-[-50%] cursor-pointer' onClick={showpassHandler}></div>

                                        }

                                    </>
                                    :
                                    ''
                            }



                        </div>
                        {errors.userPassword && <p className="text-[red]">{errors.userPassword.message}</p>}
                    </div>
                    <div className='mb-4'>
                        <p className='text-center text-[12px] text-[#73738A] font-[400]'>People who use our service may have uploaded <br /> your contact information to Baby Instagram. <br /> <span className='text-[#52B3E7] cursor-pointer'><a href="https://web.whatsapp.com/" target='__blank'>Learn More</a></span> </p>
                    </div>
                    <div className="mb-4">
                        {
                            isloder ?
                                <button type='submit' disabled={true} className='bg-[#90c9ef] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white  flex justify-center items-center'><Loader2 className=' animate-spin' data-fdprocessedid="dii" /> </button>
                                :
                                <button type='submit' className='bg-[#0095F6] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white' data-fdprocessedid="uudys">Sign Up </button>
                        }


                    </div>

                </form>

                <p>Back To: <Link href={'/'}> <span className='text-[blue]'>Sign In</span></Link></p>

            </div>

        </div>
    )
}
