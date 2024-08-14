import Userprofile from "@/Modal/Userprofile";
import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect();

    try {

        const { username } = params;
        const decod = decodeURIComponent(username)
        const User = await UsersignupModal.findOne({ userName: decod });
        const Me = await Userprofile.findOne({ createdBy: User?._id })

        if (!Me) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'User found.',
            data: Me
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }
}