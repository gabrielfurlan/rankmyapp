import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  email: { type: String, unique: true },
  alerts: [{ type: Schema.Types.ObjectId, ref: 'alerts' }]
}, { timestamps	: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default userModel;
