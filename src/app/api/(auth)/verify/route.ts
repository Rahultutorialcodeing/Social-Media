import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()

    try {

        const { urlUsername, otp } = await request.json();
        const decodeName = decodeURIComponent(urlUsername);
        const User = await UsersignupModal.findOne({ userName: decodeName });

        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });

        }

        const validVerifyCode = User.verifyCode === otp;
        const isCodeNotExpired = new Date(User.verifyCodeExpiry) > new Date();

        if (validVerifyCode && isCodeNotExpired) {
            User.isVerifyed = true;
            await User.save()

            return NextResponse.json({
                success: true,
                message: 'Account verified successfully.'
            }, { status: 200 });

        } else if (!isCodeNotExpired) {
            return NextResponse.json({
                success: false,
                message: "Verification code has expired. Please sign up again to get a new code."
            }, { status: 400 });
        } else {
            return NextResponse.json({
                success: false,
                message: "Incorrect verification code."
            }, { status: 400 });
        }



    } catch (error) {

        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });

    }
}