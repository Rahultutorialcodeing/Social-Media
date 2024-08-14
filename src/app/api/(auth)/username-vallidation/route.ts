import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()
    try {

        const { searchParams } = new URL(request.url);
        const quaryData = {
            username: searchParams.get('username')
        }

        const username = quaryData.username
        const vallidateUsername = await UsersignupModal.findOne({ userName: username, isVerifyed: true })

        if (vallidateUsername) {
            return NextResponse.json({
                success: false,
                message: 'Username is already taken.'
            }, { status: 200 });
        }

        return NextResponse.json({
            success: true,
            message: 'Username is unique.'
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }



}