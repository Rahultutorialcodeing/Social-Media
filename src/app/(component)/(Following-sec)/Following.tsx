'use client'
import React, { useEffect, useState } from 'react'
import '../../css/app.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux-Toolkit/Store'
import { unfollowStetus } from '@/Redux-Toolkit/UnfollowSlice'
import axios from 'axios'
import { useParams, usePathname } from 'next/navigation'

export default function Following() {
    const selctor = useSelector((data: RootState) => data.unfollowStetus.value)
    const dispatch = useDispatch();
    const pathName = usePathname();
    const pramsh = useParams()

    const crossUnfollowhandler = () => {

        dispatch(unfollowStetus(false))

    }

    //image api
    const [profileSec, setprofileSec] = useState({
        profileImg: '',
        data: '',
        contentType: ''
    })
    const imageLodHandler = async () => {
        if (pathName == `/profile/${pramsh.userprofile}` && pramsh.userprofile !== undefined) {
            try {
                const response = await axios.post(`/api/image-in-unfollow-componnet/${pramsh.userprofile}`);
                // console.log(response.data)
                setprofileSec({
                    profileImg: response.data.data.profileImg,
                    data: response.data.data.data,
                    contentType: response.data.data.contentType
                })
            } catch (error) {

            }
        }

    }

    useEffect(() => {

        if (pathName === `/profile/${pramsh.userprofile}` && pramsh.userprofile !== undefined) {
            imageLodHandler()
        }
    }, [pathName, pramsh.userprofile])

    //unfolo api

    const unfoloHAnlder = async () => {
        try {

            const response = await axios.post(`/api/unfollow/${pramsh.userprofile}`)
            dispatch(unfollowStetus(false))


        } catch (error) {

        }
    }
    return (
        <>
            <div onClick={crossUnfollowhandler} className={`w-full min-h-screen postBlur fixed top-0 left-0 z-[99]  flex justify-center items-center duration-[.5s] ${selctor ? ' opacity-[1] visible ' : 'opacity-0 invisible'}`}>

            </div>

            <div className={` rounded-lg shadow-md max-w-md md:w-full w-[300px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[99999] bg-white duration-[.5s] ${selctor ? ' opacity-[1] visible scale-[1] ' : 'opacity-0 invisible scale-[1.2]'}`} id='register'>
                <span className=' absolute right-[10px] top-0 text-[40px] cursor-pointer' onClick={crossUnfollowhandler}>&times;</span>
                <div className='px-4 pt-4 flex justify-center flex-col items-center'>
                    <div className='w-[56px] h-[56px] bg-black overflow-hidden rounded-[50%] cursor-pointer'>
                        <label htmlFor="editImage" className=' cursor-pointer'>
                            {
                                profileSec.profileImg != '' ?
                                    <Image src={`data:${profileSec.contentType};base64,${Buffer.from(profileSec.data).toString('base64')}`} alt='profile' width={56} height={56} priority={true} className=' w-full h-full object-cover' />
                                    :
                                    <Image src={'https://scontent-cgk2-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-cgk2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=gt6nfLKGL2IQ7kNvgE9FX9A&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYCCh4T5dB7F5qzjscBrYdR_yNk4dLJbGQAu2rx7D5WuaA&oe=6682110F&_nc_sid=65462d'} alt='' width={56} height={56} priority={false} />
                            }

                        </label>
                    </div>
                    <p className='font-[600]'>{pramsh.userprofile}</p>
                </div>
                <div className='post2 mt-4'></div>
                <div className=''>
                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]'><p>Add to close friends list</p>
                        <div className='round-a rounded-[50%]  p-[2px] flex justify-center items-center'>
                            <svg aria-label="Close friend" fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M18.18 22.51a.99.99 0 0 1-.513-.142L12 18.975l-5.667 3.393a1 1 0 0 1-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 0 1 .536-1.737l6.554-.855 2.668-5.755a1 1 0 0 1 1.814 0l2.668 5.755 6.554.855a.999.999 0 0 1 .536 1.737l-4.876 4.347 1.37 6.544a1 1 0 0 1-.978 1.205Z"></path></svg>
                        </div>
                    </div>
                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]'><p>Add to favorites</p>

                        <svg aria-label="Favorited" fill="currentColor" height="20" role="img" viewBox="0 0 24 24" width="20"><path d="M18.18 22.51a.99.99 0 0 1-.513-.142L12 18.975l-5.667 3.393a1 1 0 0 1-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 0 1 .536-1.737l6.554-.855 2.668-5.755a1 1 0 0 1 1.814 0l2.668 5.755 6.554.855a.999.999 0 0 1 .536 1.737l-4.876 4.347 1.37 6.544a1 1 0 0 1-.978 1.205ZM12 16.81a1 1 0 0 1 .514.142l4.22 2.528-1.021-4.873a.998.998 0 0 1 .313-.952l3.676-3.276-4.932-.644a1 1 0 0 1-.778-.57L12 4.867l-1.992 4.297a1 1 0 0 1-.779.57l-4.931.644 3.676 3.276a.998.998 0 0 1 .313.951l-1.02 4.873 4.22-2.527A1 1 0 0 1 12 16.81Z"></path></svg>

                    </div>
                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]'><p>Block</p>    </div>
                    <div className='flex justify-between items-center cursor-pointer p-3 hover:bg-[#e8e7e7]' onClick={unfoloHAnlder}><p>Unfollow</p>    </div>
                </div>
            </div>



        </>


    )
}
