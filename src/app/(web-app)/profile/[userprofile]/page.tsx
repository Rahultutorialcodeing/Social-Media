'use client'
import { boderStetus } from '@/Redux-Toolkit/BorderSclice'
import { florFucStetus } from '@/Redux-Toolkit/FollowersFuctionSlice'
import Meprofile from '@/app/(component)/(meprofile)/Meprofile'
import Usernotfound from '@/app/(component)/(profilenotfound)/Usernotfound'
import Userprofile from '@/app/(component)/(userprofile)/Userprofile'
import axios from 'axios'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'


export default function Profile() {
  const prahm = useParams()
  const pathName = usePathname()

  //url secure api
  const [userlData, setuserlData] = useState();
  const [userData, setUserData] = useState({
    usename: '',
    userfullname: '',
  })




  const urlSecure = async () => {
    if (pathName !== `/profile/${undefined}`) {
      try {

        const response = await axios.post(`/api/url-secure/${prahm.userprofile}`)
        setuserlData(response.data.message);
        setUserData({
          usename: response.data.data.userName,
          userfullname: response.data.data.userFullName
        })



      } catch (error) {

      }
    }

  }
  useEffect(() => {
    urlSecure()

  }, [pathName !== `/profile/${undefined}`])


  const [folow, setfolow] = useState({
    totalFollowers: '',
    totalFollowing: ''
  })

  const FollowHanlder = async () => {
    if (pathName !== `/profile/${undefined}`) {
      try {

        const response = await axios.post(`/api/vew-Follow-and-Following/${prahm.userprofile}`)

        setfolow({
          totalFollowers: response.data.totalFollowers,
          totalFollowing: response.data.totalFollowing
        })

      } catch (error) {

      }
    }
  }
  useEffect(() => {
    FollowHanlder()

  }, [pathName !== `/profile/${undefined}`])

  //bio profile url
  const [profileSec, setprofileSec] = useState({
    profileImg: '',
    websitelink: '',
    biopart: '',
    data: '',
    contentType: ''
  })


  const [isloder, setisloder] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(boderStetus(isloder));

  }, [isloder, dispatch]);
  const profileHandler = async () => {
    if (pathName !== `/profile/${undefined}`) {
      try {
        setisloder(true)
        const response = await axios.post(`/api/vew-profile/${prahm.userprofile}`);
        setprofileSec({
          profileImg: response.data.message.profileImg,
          websitelink: response.data.message.website,
          biopart: response.data.message.bio,
          data: response.data.message.data,
          contentType: response.data.message.contentType
        }
        )


      } catch (error) {

      } finally {
        setisloder(false)
      }
    }
  }


  useEffect(() => {
    profileHandler()

  }, [pathName !== `/profile/${undefined}`])




  //post api

  const [postUser, setpostUser] = useState({
    userpost: ''
  })

  const [loing, setloding] = useState(false)

  const postHandler = async () => {
    if (pathName !== `/profile/${undefined}`) {

      try {

        setloding(true)
        let response = await axios.post(`/api/vew-all-post/${prahm.userprofile}`);


        setpostUser({
          userpost: response.data.data
        })


      } catch (error) {

      } finally {
        setloding(false)
      }


    }
  }





  useEffect(() => {
    
    postHandler()

  }, [pathName !== `/profile/${undefined}`])




  return (
    <div>
      {
        (userlData == 'You are admin.') ?
          <Meprofile userPrData={{ userData, folow, profileSec, postUser, loing }} />
          :
          (userlData == 'You are not admin.') ?
            <Userprofile userPrData={{ userData, folow, profileSec }} />
            :
            <>
              {userlData}
              <Usernotfound />
            </>
      }

    </div>
  )
}
