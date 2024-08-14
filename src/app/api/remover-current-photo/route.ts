import Userprofile from "@/Modal/Userprofile";
import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await dbConnect()
    try {

        const tokenId = getDataFromToken(request);
        const User = await UsersignupModal.findOne({ _id: tokenId });
        const Meprofile: any = await Userprofile.findOne({ createdBy: User?._id })

        if (!Meprofile) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        Meprofile.profileImg = '';
        Meprofile.data = '';
        Meprofile.contentType = '';

        await Meprofile.save()
        return NextResponse.json({
            success: true,
            message: 'Profile Photo remove successfully.'
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}