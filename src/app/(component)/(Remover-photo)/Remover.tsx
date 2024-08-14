'use client'
import { removerPhotoStetus } from '@/Redux-Toolkit/Remove-PhtoSlice';
import { RootState } from '@/Redux-Toolkit/Store';
import { ApiResposnse } from '@/Types/Apires';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import axios, { AxiosError } from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Remover() {
    const selctor = useSelector((data: RootState) => data.removerPhotoStetus.value)
    const dispatch = useDispatch();

    const crossUnfollowhandlerjds = () => {

        dispatch(removerPhotoStetus(false))

    }

    const apiremoverhanlde = async () => {
        try {


            const reponse = await axios.post('/api/remover-current-photo')


            toast({
                description: reponse.data.message,
                className: "success"
            })
            dispatch(removerPhotoStetus(false))

        } catch (error) {
            const axiosError = error as AxiosError<ApiResposnse>
            const errorMessage = axiosError.response?.data.message ?? 'An oncupy error.'
            toast({
                description: errorMessage,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                className: "wrong"
            })
        }

    }
    return (
        <>
            <div onClick={crossUnfollowhandlerjds} className={`w-full min-h-screen postBlur fixed top-0 left-0 z-[99]  flex justify-center items-center duration-[.5s] ${selctor ? ' opacity-[1] visible ' : 'opacity-0 invisible'}`}>

            </div>

            <div className={` rounded-lg shadow-md max-w-md md:w-full w-[300px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>



                <div className=''>

                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7] ' onClick={apiremoverhanlde}><p className='text-[red] w-full text-center font-bold'>Remove Current Photo</p>    </div>
                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]' onClick={crossUnfollowhandlerjds} ><p className=' w-full text-center'>Cancel</p>    </div>
                </div>
            </div>



        </>
    )
}
