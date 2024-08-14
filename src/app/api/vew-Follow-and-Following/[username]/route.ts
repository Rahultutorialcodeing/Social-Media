import UsersignupModal from "@/Modal/Usersign-up";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect()
    try {
        const { username } = params;
        const decodedUsername = decodeURIComponent(username)
        const User = await UsersignupModal.findOne({ userName: decodedUsername });

        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'User found.',
            totalFollowers: User.followAndFollowing.totalFollowers.length,
            totalFollowing: User.followAndFollowing.totalFollowing.length,
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });

    }

}