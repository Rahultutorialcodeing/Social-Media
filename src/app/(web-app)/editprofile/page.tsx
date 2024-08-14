'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';
import { ApiResposnse } from '@/Types/Apires';
import { ToastAction } from '@radix-ui/react-toast';
import { Loader2 } from 'lucide-react';

export default function Editprofile() {
    const userGenders = [
        { id: 1, gender: "Male" },
        { id: 2, gender: "Female" },
        { id: 3, gender: "Prefer not to say" },
    ];

    const [inputValue, setInputValue] = useState({

        website: '',
        bio: '',
        gender: ''
    });

    const [label, setLabel] = useState(false);

    const genderHandler = (gender: string) => {
        setInputValue((prevState) => ({ ...prevState, gender }));
        setLabel(false);
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputValue((prevState) => ({ ...prevState, [name]: value }));
    };

    const labelHandler = () => {
        setLabel((prevLabel) => !prevLabel);
    };

    const isFormValid = inputValue.website !== '' || inputValue.bio !== '' || inputValue.gender !== '';



    //api sec
    let [isloder, setloder] = useState(false)
    const submitHandler = async (e: any) => {
        e.preventDefault()
        const fromdata = new FormData(e.target)

        try {
            setloder(true)
            const response = await axios.post('/api/user-profile', fromdata);
            toast({
                description: response.data.message,
                className: "success"
            })

            setInputValue({

                website: '',
                bio: '',
                gender: ''
            });

            setprev('')

        } catch (error) {
            const axiosError = error as AxiosError<ApiResposnse>
            const errorMessage = axiosError.response?.data.message ?? 'An occupy error.'
            toast({
                description: errorMessage,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                className: "wrong"
            })

        } finally {
            setloder(false)
        }
    }

    ///image prev sec
    let [prev, setprev] = useState('')

    const iamgePrev = (event: any) => {
        let imgFile = event.target
        let reader = new FileReader();
        reader.readAsDataURL(imgFile.files[0]);
        reader.onload = function (e: any) {
            setprev(e.target.result)

        };


    }

    //usename or name api
    const [tokendata, settokendata] = useState({
        username: '',
        userfullname: ''
    })
    const ProfileHanlder = async () => {
        try {
            const response = await axios.post('/api/edit-profile-public');
            settokendata({
                username: response.data.data.userName,
                userfullname: response.data.data.userFullName
            })
        } catch (error) {

        }

    }

    useEffect(() => {
        ProfileHanlder()
    }, [])
    return (
        <div className='py-[20px] px-[12px] flex justify-center items-center'>
            <div className="p-8 rounded-lg w-full max-w-3xl mx-auto" id='register'>
                <h1 className='text-[20px] font-[700] mb-[20px]'>Edit profile</h1>
                <form onSubmit={submitHandler}>

                    <div className='p-[16px] bg-[#EFEFEF] flex items-center justify-between rounded-[20px]'>
                        <div className='flex items-center gap-5'>
                            <div className=''>
                                <div className='w-[56px] h-[56px] bg-black overflow-hidden rounded-[50%] cursor-pointer'>
                                    <label htmlFor="editImage" className=' cursor-pointer'>
                                        {
                                            prev !== '' ?
                                                <img src={prev} alt='' style={{ width: '56px', height: '56px' }} />
                                                :
                                                <Image src={'https://scontent-cgk2-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-cgk2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=gt6nfLKGL2IQ7kNvgE9FX9A&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYCCh4T5dB7F5qzjscBrYdR_yNk4dLJbGQAu2rx7D5WuaA&oe=6682110F&_nc_sid=65462d'} alt='' width={56} height={56} />

                                        }
                                    </label>

                                </div>
                            </div>
                            <div>
                                <h1 className='text-[16px] font-[700]'>{tokendata.username}</h1>
                                <p className='text-[14px] font-[400] text-[#737373]'>{tokendata.userfullname}</p>
                            </div>
                        </div>
                        <div>
                            <input type="file" accept='image/*' id='editImage' className='hidden' name='profileImg' onChange={(e) => iamgePrev(e)} />
                            <label htmlFor='editImage' className='bg-[#1877F2] px-[16px] py-[5px] text-white text-[14px] cursor-pointer' style={{ borderRadius: "8px" }}>Change Photo</label>
                        </div>
                    </div>

                    <div className='mt-[20px] flex flex-col gap-3'>
                        <label htmlFor="Website" className='text-[16px] font-[700]'>Website</label>
                        <input type="text" id='Website' name='website' className='px-[16px] py-[10px] saveh outline-0 rounded-[12px]' placeholder='Website' value={inputValue.website} onChange={changeHandler} />
                    </div>
                    <div className='mt-[20px] flex flex-col gap-3'>
                        <label htmlFor="Bio" className='text-[16px] font-[700]'>Bio</label>
                        <input type="text" id='Bio' name='bio' className='px-[16px] py-[10px] saveh outline-0 rounded-[12px]' placeholder='Bio' value={inputValue.bio} onChange={changeHandler} />
                    </div>
                    <div className='mt-[20px] flex flex-col gap-3'>
                        <label htmlFor="Gender" className='text-[16px] font-[700]'>Gender</label>
                        <div className='w-[100%] relative'>
                            <input type="text" id='Gender' name='gender' className='w-[100%] hover:bg-[#EFEFEF] px-[16px] py-[10px] cursor-pointer saveh outline-0 rounded-[12px]' value={inputValue.gender} readOnly onClick={labelHandler} />
                            <svg aria-label="Down chevron" className='absolute top-[50%] right-5 translate-y-[-50%]' fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path></svg>
                        </div>
                    </div>
                    <div className={`w-[100%] shadow-2xl saveh mt-[4px] rounded-[12px] py-[10px] ${label ? 'block' : 'hidden'}`}>
                        <div>
                            {userGenders.map((v) => (
                                <div className='cursor-pointer px-[24px] py-[16px] text-[14px] font-[400] hover:bg-[#EFEFEF]' key={v.id} onClick={() => genderHandler(v.gender)}>
                                    <h1>{v.gender}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-[20px] flex flex-col gap-3'>
                        {
                            isloder ?
                                <button type='submit' disabled={true} className='bg-[#90c9ef] w-[100%] p-[10px] rounded-[10px] text-[18px] font-[700] text-white  flex justify-center items-center'><Loader2 className=' animate-spin' /> </button>
                                :
                                <button type="submit" disabled={!isFormValid} className={`text-[14px] font-[600] text-white px-[16px] py-[10px] saveh outline-0 rounded-[12px] ${isFormValid ? 'bg-[#1877F2] cursor-pointer' : 'bg-[#B2DFFC] cursor-not-allowed'}`}>Submit</button>
                        }


                    </div>
                </form>
            </div>
        </div>
    )
}
