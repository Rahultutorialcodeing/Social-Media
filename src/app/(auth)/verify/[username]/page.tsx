'use client'
import { otpSchema } from '@/Schema/Otp-Schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'
import '../../../css/app.css'
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { ApiResposnse } from '@/Types/Apires';
import { ToastAction } from '@radix-ui/react-toast';
import { boderStetus } from '@/Redux-Toolkit/BorderSclice';
import { RootState } from '@/Redux-Toolkit/Store';

type verifySchemaCode = z.infer<typeof otpSchema>
export default function VerifyOtp() {
    const selctorGamil = useSelector((data: RootState) => data.emailStetus.value)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<verifySchemaCode>({
        resolver: zodResolver(otpSchema), // Use zodResolver with your schema
    });

    const params = useParams();
    const router = useRouter()
    const [isloder, setisloder] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(boderStetus(isloder));
    }, [isloder, dispatch]);
    const verifyHandler = async (data: verifySchemaCode) => {

        try {
            setisloder(true)
            const response = await axios.post(`/api/verify`, {
                urlUsername: params.username,
                otp: data.code
            })


            toast({
                description: response.data.message,
                className: "success"
            })

            reset()
            router.push(`/`)
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
                    <i data-visualcompletion="css-img" aria-label="Instagram" role="img" className='acountLogo mx-auto mb-[18px]'></i>
                    <h2 className='text-[#737373] font-[600]'>Enter the verification code sent to your email: <span className=' text-blue-500'>{selctorGamil}</span></h2>
                </div>

                <form onSubmit={handleSubmit(verifyHandler)}>
                    <div className="mb-4" >
                        <label htmlFor="verifyCode" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Verification Code</label>

                        <div className='relative'>
                            <input type="text" id='verifyCode' {...register('code')} className="p-[6px] w-[100%] rounded-[5px] all-singup-input" placeholder='' />
                            <span className=' absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]'>Username</span>
                        </div>
                        {errors.code && <p className="text-[red]">{errors.code.message}</p>}
                    </div>
                    <div className="mb-4">

                        {
                            isloder ?
                                <button type='submit' disabled={true} className='bg-[#90c9ef] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white  flex justify-center items-center'><Loader2 className=' animate-spin' /> </button>
                                :
                                <button type='submit' className='bg-[#0095F6] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white'>Verify Code</button>
                        }





                    </div>
                </form>
            </div>
        </div>
    )
}
