import mongoose, { Document, Schema } from "mongoose";
import { IInnovation } from "./innovations.model";

interface IProductInstance extends Document {
  innovation_id: mongoose.Types.ObjectId | IInnovation;
  filename: string;
  size?: string;
  url: string;
  uploadedAt?: Date;
  description: string;
}

const productInstanceSchema: Schema = new Schema(
  {
    innovation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Innovation",
      required: true,
    },
    filename: { type: String, required: true },
    size: { type: String },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductInstance = mongoose.model<IProductInstance>(
  "ProductInstance",
  productInstanceSchema
);

export default ProductInstance;
