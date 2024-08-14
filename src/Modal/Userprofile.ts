import mongoose, { Document, Schema } from "mongoose";

export interface profileInterFace extends Document {
    profileImg: string;
    data: Buffer;
    contentType: string;
    website: string;
    bio: string;
    gender: string;
    createdBy: mongoose.Types.ObjectId;
}
const profileModal: Schema<profileInterFace> = new Schema({
    profileImg: String,
    data: Buffer,
    contentType: String,
    website: String,
    bio: String,
    gender: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

const Userprofile = (mongoose.models.User_profile as mongoose.Model<profileInterFace>) || mongoose.model<profileInterFace>("User_profile", profileModal);

export default Userprofile;