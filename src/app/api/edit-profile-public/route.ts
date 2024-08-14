import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()

    try {
        const tokenId = getDataFromToken(request);
        const User = await UsersignupModal.findOne({ _id: tokenId });
        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }
        return NextResponse.json({
            success: true,
            message: 'User found.',
            data: User
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}