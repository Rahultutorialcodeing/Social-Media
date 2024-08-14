import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {

    await dbConnect();
    try {
        const tokenId = getDataFromToken(request);
        const { username } = params;
        const decodedUsername = decodeURIComponent(username)
        const User: any = await UsersignupModal.findOne({ userName: decodedUsername });
        const Me = await UsersignupModal.findOne({ _id: tokenId });


        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        //follow 
        User.followAndFollowing.totalFollowers.push(tokenId);
        await User.save();

        //following
        Me?.followAndFollowing.totalFollowing.push(tokenId);
        await Me?.save();


        return NextResponse.json({
            success: true,
            message: `${Me?.userName} is follow to ${User.userName}`,
        }, { status: 200 });









    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}