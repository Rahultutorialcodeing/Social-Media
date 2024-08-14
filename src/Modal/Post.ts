import mongoose, { Document, Schema } from "mongoose";

export interface PostInterFace extends Document {
    post: string;
    data: Buffer;
    contentType: string;
    createdBy: any;
}
const postModal: Schema<PostInterFace> = new Schema({
    post: String,
    data: Buffer,
    contentType: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }


}, { timestamps: true });

const UserPostModal = (mongoose.models.Post as mongoose.Model<PostInterFace>) || mongoose.model<PostInterFace>("Post", postModal);

export default UserPostModal