import Userprofile from "@/Modal/Userprofile";
import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {

    await dbConnect()
    try {
        const { username } = params;
        const User = await UsersignupModal.findOne({ userName: username });
        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }
        const prileUser =await Userprofile.findOne({ createdBy: User?._id });

        if (!prileUser) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: prileUser
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}