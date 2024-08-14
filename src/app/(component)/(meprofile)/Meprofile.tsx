'use client'
import React, { useEffect } from 'react'
import '../../css/app.css'
import Link from 'next/link'
import Image from 'next/image'
import { profileStetus } from '@/Redux-Toolkit/Profile-showSice'
import { useDispatch } from 'react-redux'
import axios, { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import { ApiResposnse } from '@/Types/Apires'
import { removerPhotoStetus } from '@/Redux-Toolkit/Remove-PhtoSlice'
import { Loader2 } from 'lucide-react'

export default function Meprofile({ userPrData }: any) {

  const dispatch = useDispatch()
  const profileshowhandler = () => {
    dispatch(profileStetus(true));
  }


  const allremovhandler = async () => {
    dispatch(removerPhotoStetus(true))

  }
  return (
    <>
      <main className='max-w-[1000px] mx-auto py-[30px] xl:px-[20px] px-[12px]'>
        {/* profile */}
        <div className=' grid grid-cols-3 gap-[30px] mb-[44px]'>
          <div className=' col-span-1 flex justify-center items-center'>
            <div className='md:w-[150px] md:h-[150px] sm:w-[99px] sm:h-[99px] w-[90px] h-[90px] rounded-[50%] cursor-pointer overflow-hidden relative'>
              {
                userPrData.profileSec.profileImg != '' ?
                  <Image onClick={allremovhandler} src={`data:${userPrData.profileSec.contentType};base64,${Buffer.from(userPrData.profileSec.data).toString('base64')}`} alt='profile' width={150} height={150} priority={true} className=' w-full h-full object-cover' />
                  :
                  <Image src={'https://instagram.famd15-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.famd15-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=gt6nfLKGL2IQ7kNvgFobHUD&edm=AEaYFD0BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYB9r0jm31k4KF0oqT1QRt6WEP8j5-Hs87iL6Dy2MFLsCg&oe=6682110F&_nc_sid=de718f'} alt='profile' width={150} height={150} priority={true} />
              }




              {
                userPrData.profileSec.profileImg == '' ?
                  <div className='md:w-[150px] md:h-[150px] sm:w-[99px]sm:h-[99px] w-[90px] h-[90px] flex justify-center items-center cameImg rounded-[50%] absolute top-0 left-0'>
                    <svg width="44" viewBox="0 0 24 24" height="44" fill="currentColor" className="x10l6tqk xtzzx4i xwa60dl x11lhmoz"><path d="M12 9.652a3.54 3.54 0 1 0 3.54 3.539A3.543 3.543 0 0 0 12 9.65zm6.59-5.187h-.52a1.107 1.107 0 0 1-1.032-.762 3.103 3.103 0 0 0-3.127-1.961H10.09a3.103 3.103 0 0 0-3.127 1.96 1.107 1.107 0 0 1-1.032.763h-.52A4.414 4.414 0 0 0 1 8.874v9.092a4.413 4.413 0 0 0 4.408 4.408h13.184A4.413 4.413 0 0 0 23 17.966V8.874a4.414 4.414 0 0 0-4.41-4.41zM12 18.73a5.54 5.54 0 1 1 5.54-5.54A5.545 5.545 0 0 1 12 18.73z"></path></svg>
                  </div>
                  :
                  ''
              }



            </div>

          </div>
          <div className=' h-[100%] col-span-2 flex flex-col justify-center  gap-5'>
            <div className='flex gap-[15px] items-center'>
              <div >
                <p className='text-[20px] cursor-pointer font-[400] break-all	break-words line-clamp-2 md:w-[108px]' onClick={profileshowhandler}>{userPrData.userData.usename}</p>
              </div>

              <div className='md:block hidden'>
                <div className='flex gap-[15px] items-center'>
                  <button className='text-[14px]  font-[600] py-2 px-4 bg-[#e8e7e7] hover:bg-[#DBDBDB] ' style={{ borderRadius: "5px" }}><Link href='/editprofile'>Edit Profile</Link></button>
                  <button className='text-[14px]  font-[600] py-2 px-4 bg-[#e8e7e7] hover:bg-[#DBDBDB] ' style={{ borderRadius: "5px" }}>Uplod Story</button>
                </div>
              </div>
              <div className=' cursor-pointer'>
                <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>

              </div>

            </div>

            <div className='md:block hidden'>
              <div className='flex gap-[30px] items-center'>
                <p className='cursor-pointer'><span className='text-[16px] font-[600]'>0</span> Posts</p>
                <p className='cursor-pointer'><span className='text-[16px] font-[600]'>{userPrData.folow.totalFollowers}</span> Followers</p>
                <p className='cursor-pointer'><span className='text-[16px] font-[600]'>{userPrData.folow.totalFollowing}</span> following</p>
              </div>
            </div>

            <div className='md:hidden block'>
              <div className='flex gap-[15px] items-center'>
                <button className='sm:*:text-[14px] text-[12px]  font-[600] py-2 px-4 bg-[#e8e7e7] hover:bg-[#DBDBDB] ' style={{ borderRadius: "5px" }}><Link href='/editprofile'>Edit Profile</Link></button>
                <button className='sm:*:text-[14px] text-[12px]  font-[600] py-2 px-4 bg-[#e8e7e7] hover:bg-[#DBDBDB] ' style={{ borderRadius: "5px" }}>Uplod Story</button>
              </div>
            </div>

            <div>
              <h6 className='text-[16px] font-[600] line-clamp-2'>{userPrData.userData.userfullname}</h6>
              <h5 className='text-[14px] font-[400] line-clamp-2'>{userPrData.profileSec.biopart}</h5>
              <h5 className='text-[14px] line-clamp-2 font-[600] text-[#18377E] hover:underline cursor-pointer' ><a href={userPrData.profileSec.websitelink} target='_blank'>{userPrData.profileSec.websitelink}</a></h5>
            </div>

          </div>

        </div>


        {/*  higlit */}

        <section className='w-[100%] flex overflow-x-scroll justify-between gap-11 scrollsec'>

          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>

          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>
          <div className='w-[100px] h-[138px]  '>
            <div className='w-[87px] h-[87px] rounded-[50%] saveh flex cursor-pointer justify-center items-center'>
              <div className='bg-[#d0cfcf] flex justify-center items-center text-[50px] w-[77px] h-[77px] rounded-[50%]'>
                <svg aria-label="Plus icon" className="text-[#f6f6f6]" fill="currentColor" height="44" role="img" viewBox="0 0 24 24" width="44"><path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path></svg>
              </div>
            </div>

            <p className='text-[14px] line-clamp-2 font-[600] text-center my-[16px] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, repellendus eum. Deleniti, placeat! Neque, nesciunt. Accusantium perspiciatis molestias dignissimos nobis aperiam, pariatur quisquam, dolore dolores molestiae accusamus eius nesciunt voluptatum?</p>
          </div>



        </section>

        <div className='md:hidden block'>
          <section className='w-[100%] postm mt-[10px] flex justify-around items-center post py-[20px] '>
            <div>
              <h5 className='text-center font-[600]'>0</h5>
              <h4 className='font-[400] text-[20px] text-[#4a4949]'>Posts</h4>
            </div>
            <div>
              <h5 className='text-center font-[600]'>{userPrData.folow.totalFollowers}</h5>
              <h4 className='font-[400] text-[20px] text-[#4a4949]'>Followers</h4>
            </div>
            <div>
              <h5 className='text-center font-[600]'>{userPrData.folow.totalFollowing}</h5>
              <h4 className='font-[400] text-[20px] text-[#4a4949]'>Following</h4>

            </div>



          </section>
        </div>

        <section className='w-[100%] postm1 md:mt-[50px] mt-[0px] py-[20px]'>
          <div className='flex justify-center items-center sm:gap-12 gap-7 px-[12px]'>
            <div className=' flex gap-2 items-center cursor-pointer'>
              <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
              <p className='text-[12px] font-[600]'>POSTS</p>

            </div>
            <div className=' flex gap-2 items-center cursor-pointer'>
              <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
              <p className='text-[12px] font-[600]'>REELS</p>

            </div>
            <div className=' flex gap-2 items-center cursor-pointer'>
              <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
              <p className='text-[12px] font-[600]'>SAVED</p>

            </div>
            <div className=' flex gap-2 items-center cursor-pointer'>
              <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
              <p className='text-[12px] font-[600]'>TAGGED</p>

            </div>

          </div>

        </section>

        {
          userPrData.loing ?
            <div className='w-full h-[200px] flex justify-center items-center flex-col'>
            <div id='loader'></div>
            </div>
            :
            <section className='w-[100%] grid grid-cols-3 gap-2 '>

              <>
                {
                  userPrData.postUser.userpost && userPrData.postUser.userpost.length >= 1 ?
                    <>
                      {userPrData.postUser.userpost.map((v: any, i: any) => {
                        let c = v.contentType.slice(0, 5);

                        return (
                          (c == 'image') ?
                            <div className='h-[300px] ' key={i}>
                              <Image src={`data:${v.contentType};base64,${Buffer.from(v.data).toString('base64')}`} alt='post' width={150} height={150} priority={true} className=' w-full h-full object-cover' />
                            </div>
                            :
                            <div className='h-[300px] ' key={i}>
                              <video autoPlay src={`data:${v.contentType};base64,${Buffer.from(v.data).toString('base64')}`} className=' w-full h-full object-cover' ></video>
                            </div>
                        )
                      })
                      }
                    </>
                    :
                    <div className=''>Not Post Uploded</div>
                }
              </>
            </section>
        }







      </main>
    </>
  )
}
