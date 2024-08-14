import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect();
    try {
        const tokenID = getDataFromToken(request)
        const { username } = params;
        const decodedUsername = decodeURIComponent(username)
        const User = await UsersignupModal.findOne({ userName: decodedUsername, isVerifyed: true }).select('-createdAt').select('-isVerifyed').select('-updatedAt').select('-userPassword').select('-verifyCode').select('-verifyCodeExpiry').select('-__v')
        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'Sorry, this page is not available.'
            }, { status: 400 });

        }
        const UserId = User?._id == tokenID



        if (!UserId) {
            return NextResponse.json({
                success: true,
                message: 'You are not admin.',
                data: User
            }, { status: 200 });


        }
        return NextResponse.json({
            success: true,
            message: 'You are admin.',
            data: User
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}