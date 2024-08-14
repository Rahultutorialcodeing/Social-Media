import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendVerificationEmial } from "@/helper/VerificationEmial";

export async function POST(request: NextRequest) {

    await dbConnect();
    try {

        //get data from frontend
        const { userName, userEmail, userFullName, userPassword } = await request.json();

        //check is userName exits or not
        const userExitsbyUsername = await UsersignupModal.findOne({ userName, isVerifyed: true });

        if (userExitsbyUsername) {
            return NextResponse.json({
                success: false,
                message: 'Username is already taken.'
            }, { status: 400 });
        }

        //check is userEmail exits or not
        const userExitsbyUseremail = await UsersignupModal.findOne({ userEmail });

        if (userExitsbyUseremail) {

            if (userExitsbyUseremail.isVerifyed) {
                return NextResponse.json({
                    success: false,
                    message: 'Email is already registered.'
                }, { status: 400 });
            } else {
                // If user exists but not verified, update their details and resend verification email
                const hashedPassword = await bcrypt.hash(userPassword, 10);
                const code = Math.floor(100000 + Math.random() * 900000).toString()
                userExitsbyUseremail.userName = userName;
                userExitsbyUseremail.userFullName = userFullName;
                userExitsbyUseremail.userPassword = hashedPassword;
                userExitsbyUseremail.verifyCode = code;
                userExitsbyUseremail.verifyCodeExpiry = new Date(Date.now() + 3600000);

                await userExitsbyUseremail.save()

                //send resend email
                const emailRes = await sendVerificationEmial(userName, userEmail, code);

                if (!emailRes.success) {
                    return NextResponse.json({
                        success: false,
                        message: emailRes.message
                    }, { status: 500 });
                }

                return NextResponse.json({
                    success: true,
                    message: "Verification email resent. Please check your email.",
                    datausername: userExitsbyUseremail.userName,
                    datauseremail: userExitsbyUseremail.userEmail
                }, { status: 200 });

            }

        }

        //if userName or Emial dont match tha save to detabse
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const code = Math.floor(100000 + Math.random() * 900000).toString()
        const verifyCodeExpiryDate = new Date();
        verifyCodeExpiryDate.setHours(verifyCodeExpiryDate.getHours() + 1);
        let seveRes = new UsersignupModal({
            userName,
            userEmail,
            userFullName,
            userPassword: hashedPassword,
            verifyCode: code,
            verifyCodeExpiry: verifyCodeExpiryDate
        })
        await seveRes.save()

        const emailRes = await sendVerificationEmial(userName, userEmail, code);

        if (!emailRes.success) {
            return NextResponse.json({
                success: false,
                message: emailRes.message
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully. Please verify your email.",
            datausername: seveRes.userName,
            datauseremail: seveRes.userEmail
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });

    }

}