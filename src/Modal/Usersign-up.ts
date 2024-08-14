import mongoose, { Document, Schema } from "mongoose";

export interface SigNupInterFace extends Document {
    userName: string;
    userEmail: string;
    userFullName: string;
    userPassword: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerifyed: boolean;
    followAndFollowing: any;
}
const userModal: Schema<SigNupInterFace> = new Schema({
    userName: String,
    userEmail: String,
    userFullName: String,
    userPassword: String,
    verifyCode: String,
    verifyCodeExpiry: Date,
    isVerifyed: {
        type: Boolean,
        default: false
    },
    followAndFollowing: {
        totalFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        totalFollowing: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }

}, { timestamps: true });

const UsersignupModal = (mongoose.models.User as mongoose.Model<SigNupInterFace>) || mongoose.model<SigNupInterFace>("User", userModal);

export default UsersignupModal;