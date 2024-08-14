import dbConnect from "@/lib/dbconnect";
import UserPostModal from "@/Modal/Post";
import UsersignupModal from "@/Modal/Usersign-up";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect()
    try {

        const { username } = params;
        const decode = decodeURIComponent(username)
        const User = await UsersignupModal.findOne({ userName: decode })
        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }
        const Me = await UserPostModal.find({ createdBy: User._id });

        if (!Me) {
            return NextResponse.json({
                success: true,
                message: 'Post not uploded by user'
            }, { status: 200 });
        }
        return NextResponse.json({
            success: true,
            message: 'Post uploded by user',
            data: Me
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}