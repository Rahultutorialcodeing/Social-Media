'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import '../css/app.css'
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchemalogin } from '@/Schema/SignIn-Schema';
import { useForm } from 'react-hook-form';
import z from 'zod'
import axios, { AxiosError } from 'axios';
import { ApiResposnse } from '@/Types/Apires';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useDispatch } from 'react-redux';
import { boderStetus } from '@/Redux-Toolkit/BorderSclice';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SignInFormData = z.infer<typeof signUpSchemalogin>
export default function SingIn() {
  let [showpass, setshowPassword] = useState(false)
  let showpassHandler = () => {
    setshowPassword((showpass) => !showpass)
  }


  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchemalogin), // Use zodResolver with your schema
  });

  let watchTime = watch('userPassword', '');
  let [passwordInput, setPasswordInput] = useState(false);

  useEffect(() => {
    if (watchTime.length >= 1) {
      setPasswordInput(true);
    } else {
      setPasswordInput(false); // You might want to handle the case when the length is less than 1
    }
  }, [watchTime]); // Include watchTime in the dependency array

  const router = useRouter()
  const [isloder, setisloder] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(boderStetus(isloder));

  }, [isloder, dispatch]);
  const submitHandler = async (data: SignInFormData) => {
    try {
      setisloder(true)
      const response = await axios.post('/api/sign-in', data)
      toast({
        description: response.data.message,
        className: "success"
      })
      reset()
      router.push('/home')

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
    <div className="flex justify-center items-center min-h-screen py-[20px] px-[12px] bg-white flex-col" >
      <div className="p-8 rounded-lg w-full max-w-md shadow-md" id='register'>
        <div className="mb-6 text-center">

          <i data-visualcompletion="css-img" aria-label="Instagram" role="img" className='acountLogo  mx-auto mb-[18px]'></i>
          <h2 className='text-[#737373] font-[600]'>Log in to see photos and videos <br /> from your friends.</h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Username / Email</label>
            <div className='relative'>
              <input type="text" autoComplete='' id='username' {...register('userNameOrEmail')} className="p-[6px] w-[100%] rounded-[5px] all-singup-input" placeholder='' />
              <span className=' absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]'>Username / Email</span>
            </div>
            {errors.userNameOrEmail && <p className="text-[red]">{errors.userNameOrEmail.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-[18px] font-[400] mb-[6px] text-[#606770]">Password</label>
            <div className='relative'>
              <input id='password' autoComplete='' type={`${showpass ? 'text' : 'password'}`} {...register('userPassword')} className={`p-[6px] w-[100%]  rounded-[5px] all-singup-input`} placeholder='' />
              <span className={` absolute top-[50%] translate-y-[-50%] left-[6px] all-palceholder pointer-events-none text-[#929292]`}>Password</span>
              {
                passwordInput ?
                  <>
                    {showpass ? <div className='hidepass absolute right-[6px] top-[50%] w-[16px] h-[16px] translate-y-[-50%] cursor-pointer' onClick={showpassHandler}></div>

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
          <div className="mb-4">


            {
              isloder ?
                <button type='submit' disabled={true} className='bg-[#90c9ef] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white  flex justify-center items-center'><Loader2 className=' animate-spin' /> </button>

                :
                <button type='submit' className='bg-[#0095F6] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white'>Log In </button>
            }








          </div>

        </form>
        <p className='text-center'> <Link href={'/sign-up'}> <span className='text-[#523783]'>Forget Password ?</span></Link></p>

      </div>

      <div className="p-8 rounded-lg  w-full max-w-md mt-3" id='register'>
        <p className='text-center'> <Link href={'/sign-up'}> <span className='text-[blue]'>Create new account</span></Link></p>
      </div>
    </div>
  )
}

