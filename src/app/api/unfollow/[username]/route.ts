import Userprofile from "@/Modal/Userprofile";
import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Params }) {
    await dbConnect();

    try {

        const tokenId = getDataFromToken(request)
        const { username } = params;
        const decod = decodeURIComponent(username)
        const User = await UsersignupModal.findOne({ userName: decod });
        const Me = await UsersignupModal.findOne({ _id: tokenId });

        if (!User) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }
        if (!Me) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }


        User.followAndFollowing.totalFollowers = User?.followAndFollowing.totalFollowers.filter((v: any) => {
            return v.toString() !== tokenId
        })

        Me.followAndFollowing.totalFollowing = Me?.followAndFollowing.totalFollowing
            .filter((v: any) => {
                return v.toString() !== tokenId
            })

        await User.save();
        await Me.save();

        return NextResponse.json({
            success: true,
            message: `unfollow succesfully`
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }
}