import Userprofile from "@/Modal/Userprofile";
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
        const findByid: any = await Userprofile.findOne({ createdBy: tokenId });

        const profileImg: any = reqData.get('profileImg');
        console.log(profileImg)
        const website = reqData.get('website');
        const bio = reqData.get('bio');
        const gender = reqData.get('gender');

        let profileImgName = '';
        let profileImgBuffer = null;
        let profileImgType = '';

        if (profileImg && profileImg.name) {
            const bufferData = await profileImg.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const path = `./public/profileImg/${profileImg.name}`;
            await writeFile(path, buffer);
            profileImgName = profileImg.name;
            profileImgBuffer = buffer;
            profileImgType = profileImg.type;
        }

        if (findByid) {
            // Update case
            if (!profileImgName) {
                // If no new profile image is uploaded
                findByid.profileImg = '';
                findByid.data = '';
                findByid.contentType = '';
            } else {
                // If a new profile image is uploaded
                findByid.profileImg = profileImgName;
                findByid.data = profileImgBuffer;
                findByid.contentType = profileImgType;
            }
            findByid.website = website;
            findByid.bio = bio;
            findByid.gender = gender;
            await findByid.save();

            return NextResponse.json({
                success: true,
                message: 'Profile updated successfully'
            }, { status: 200 });
        } else {
            // Create case
            const saveRes = new Userprofile({
                profileImg: profileImgName,
                data: profileImgBuffer,
                contentType: profileImgType,
                website: website,
                bio: bio,
                gender: gender,
                createdBy: new mongoose.Types.ObjectId(tokenId)
            });

            await saveRes.save();
            return NextResponse.json({
                success: true,
                message: 'Profile created successfully'
            }, { status: 200 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error.'
        }, { status: 500 });
    }
}
