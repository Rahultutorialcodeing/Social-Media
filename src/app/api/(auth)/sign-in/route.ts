import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
    await dbConnect();
    try {


        const { userNameOrEmail, userPassword } = await request.json();
        const User = await UsersignupModal.findOne({
            $and: [
                {
                    $or: [
                        { userName: userNameOrEmail },
                        { userEmail: userNameOrEmail }
                    ]
                },
                { isVerifyed: true } // Assuming 'verified' is a field in your schema indicating if the user is verified
            ]
        });

        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'Sorry email / username does not exist...'
            }, { status: 400 });
        }


        const vallidPassword =await bcrypt.compare(userPassword, User.userPassword);
        if (!vallidPassword) {
            return NextResponse.json({
                success: false,
                message: 'Sorry password does not exist..."'
            }, { status: 400 });
        }

        const tokenData = {
            id: User._id,
            username: User.userName,
            useremail: User.userEmail
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        let response = NextResponse.json({
            message: `${tokenData.username} welcom to instagram`,
            success: true,
            username: tokenData.username
        },{status:200})

        response.cookies.set("token", token, {
            httpOnly: true
        })


        return response
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });

    }

}