'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../Redux-Toolkit/Store'

export default function SingBorderLoder() {
    const selector = useSelector((data: RootState) => data.singleboderStetus.value);



    return (
        <div className={` h-[3px] bg-red-500 fixed top-0  z-[99999999999999999999999999999] ${selector ? 'w-full left-0' : ' w-0 right-0'} rounded-3xl duration-[.3s]`}></div>
    )
} 
