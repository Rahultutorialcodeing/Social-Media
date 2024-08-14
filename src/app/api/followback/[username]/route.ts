import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect();
    try {

        const tokenId: any = getDataFromToken(request);
        const { username } = params;
        const decodedUsername = decodeURIComponent(username);

        const User: any = await UsersignupModal.findOne({ userName: decodedUsername });
        const Me = await UsersignupModal.findOne({ _id: tokenId })


        //followback
        const User_id = User.followAndFollowing.totalFollowers.includes(tokenId);

        const followback = Me?.followAndFollowing.totalFollowers.includes(User._id);

        const folowingback = User?.followAndFollowing.totalFollowers.includes(tokenId);
        // console.log(`Current User follows Target User-: ${followback}`);
        // console.log(`Target User follows Current User-: ${folowingback}`);
        if (followback && !folowingback) {
            return NextResponse.json({
                success: true,
                message: 'Follow Back'
            }, { status: 200 });
        }
        if (followback && folowingback) {
            return NextResponse.json({
                success: true,
                message: 'Following'
            }, { status: 200 });
        }



        if (!User_id) {
            return NextResponse.json({
                success: true,
                message: 'Follow'
            }, { status: 200 });
        }

        return NextResponse.json({
            success: true,
            message: 'Following'
        }, { status: 200 });



    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });

    }
}