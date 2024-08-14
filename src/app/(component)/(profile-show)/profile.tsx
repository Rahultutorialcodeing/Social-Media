'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux-Toolkit/Store';
import { profileStetus } from '@/Redux-Toolkit/Profile-showSice';
import '../../css/app.css'
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function ProfileShow() {
    const selctor = useSelector((data: RootState) => data.profileStetus.value)

    const dispatch = useDispatch();
    const pathName = usePathname();
    const pramsh = useParams()


    const crossUnfollowhandler = () => {

        dispatch(profileStetus(false))

    }

    //bio profile url
    const [isloder, setisloder] = useState(false)
    const [profileSec, setprofileSec] = useState({
        profileImg: '',
        websitelink: '',
        biopart: '',
        data: '',
        contentType: '',
    })


    const profileHandler = async () => {
        if (pathName == `/profile/${pramsh.userprofile}`  && pramsh.userprofile !== undefined) {
            try {
                setisloder(true)

                const response = await axios.post(`/api/vew-profile/${pramsh.userprofile}`);
                setprofileSec({
                    profileImg: response.data.message.profileImg,
                    websitelink: response.data.message.website,
                    biopart: response.data.message.bio,
                    data: response.data.message.data,
                    contentType: response.data.message.contentType
                }
                )


            } catch (error) {

            }
            finally {
                setisloder(false)
            }
        }

      
    }
    


    useEffect(() => {
        if(pathName === `/profile/${pramsh.userprofile}` && pramsh.userprofile !== undefined){
            profileHandler()
        }
        

    }, [pathName, pramsh.userprofile])

    const [isfu, setisful] = useState({
        username: '',
        userfullname: ''
    })

    const getFullhanmdler = async () => {
        if (pathName == `/profile/${pramsh.userprofile}`  && pramsh.userprofile !== undefined) {
            try {

                setisloder(true)
                const repnse = await axios.post(`/api/get-full-name/${pramsh.userprofile}`)
                setisful({
                    username: repnse.data.username,
                    userfullname: repnse.data.usrfullname
                })

            } catch (error) {

            }finally{
                setisloder(false)
            }
        }

    }

    useEffect(() => {
        if(pathName === `/profile/${pramsh.userprofile}` && pramsh.userprofile !== undefined){
            getFullhanmdler()
        }
       
    }, [pathName , pramsh.userprofile])
    return (
        <>
            <div onClick={crossUnfollowhandler} className={`w-full min-h-screen postBlur fixed top-0 left-0 z-[99]  flex justify-center items-center duration-[.5s] ${selctor ? ' opacity-[1] visible ' : 'opacity-0 invisible'}`}>

            </div>


            <div className={`sjs rounded-lg h-[500px] overflow-y-scroll shadow-md max-w-md md:w-full w-[300px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>

                {
                    isloder ?
                        <div className=' w-full h-full flex justify-center items-center'>
                            <Loader2 className=' animate-spin' />
                        </div>
                        :
                        <>
                            <div className='post2 w-full mt-4 text-center pb-[10px] font-bold'>About this account</div>
                            <div className='px-4 pt-4 flex justify-center flex-col items-center'>
                                <div className='w-[78px] h-[78px] overflow-hidden rounded-[50%] cursor-pointer'>
                                    <label htmlFor="editImage" className=' cursor-pointer'>
                                        {
                                            profileSec.profileImg != '' ?
                                                <Image src={`data:${profileSec.contentType};base64,${Buffer.from(profileSec.data).toString('base64')}`} alt='profile' width={78} height={78} priority={true} className=' w-full h-full object-cover' />
                                                :

                                                <Image src={'https://scontent-gmp1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=vKyah88pW8EQ7kNvgEUsO5I&edm=AId3EpQBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYByph2u9VX1Vul52VCMSYzrw3yynKc7aWG6fgzATzRM9A&oe=6688704F&_nc_sid=f5838a'} alt='' width={78} height={78} priority={false} />
                                        }



                                    </label>
                                </div>
                                <p className='font-[600]'>{isfu.username}</p>
                            </div>
                            <div className='post2 mt-4'></div>
                            <div className='p-[10px] '>
                                <div className='mb-[10px]'>
                                    <label htmlFor="" className=' font-semibold'>Username</label>
                                    <p className=' text-justify'>{isfu.username}</p>
                                </div>
                                <div className='mb-[10px]'>
                                    <label htmlFor="" className=' font-semibold'>Full Name</label>
                                    <p className=' text-justify'>{isfu.userfullname}</p>
                                </div>
                                <div className='mb-[10px]'>
                                    <label htmlFor="" className=' font-semibold'>bio</label>
                                    <p className=' text-justify'>{profileSec.biopart}</p>
                                </div>
                                <div className='mb-[10px]'>
                                    <label htmlFor="" className=' font-semibold '>Link</label> <br />
                                    <a href={profileSec.websitelink} target='_blank' className='break-words text-[#18377E] hover:underline'>{profileSec.websitelink}</a>
                                </div>
                            </div>

                        </>
                }

            </div>



        </>
    )
}
