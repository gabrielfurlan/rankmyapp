import mongoose, { Schema } from "mongoose";

const alertModel = new Schema({
  keywords: { type: String, required: true },
  logtime: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  latest_send: { type: Date, default: Date.now() }
}, { timestamps	: { updatedAt: 'updated_at', createdAt: 'created_at' } });

export default alertModel;
