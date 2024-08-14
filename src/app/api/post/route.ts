import UserPostModal from "@/Modal/Post";
import UsersignupModal from "@/Modal/Usersign-up";
import { getDataFromToken } from "@/helper/GetdatafromToken";
import dbConnect from "@/lib/dbconnect";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await dbConnect();
    try {

        const tokenId = getDataFromToken(request);
        const reqData = await request.formData();

        const Me = await UsersignupModal.findOne({ _id: tokenId });
        if (!Me) {
            return NextResponse.json({
                success: false,
                message: 'User not found.'
            }, { status: 400 });
        }

        const post: any = reqData.getAll('file');
        let profileImgName = '';
        let profileImgBuffer: any = null;

        let profileImgType = '';

        post.map(async (v: any, i: any) => {


            if (v && v.name) {
                const bufferData = await v.arrayBuffer();
                const buffer = Buffer.from(bufferData);
                const path = `./public/post/${v.name}`;
                await writeFile(path, buffer);
                profileImgName = v.name;
                profileImgBuffer = buffer;
                profileImgType = v.type;
            }


            const saveRes = new UserPostModal({
                post: profileImgName,
                data: profileImgBuffer,
                contentType: profileImgType,
                createdBy: new mongoose.Types.ObjectId(tokenId)
            });

            await saveRes.save();



        })

        return NextResponse.json({
            success: true,
            message: 'Post uploded successfully'
        }, { status: 200 });





    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }

}





