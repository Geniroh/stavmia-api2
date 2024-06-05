import mongoose, { Document, Schema, Model } from "mongoose";

interface IProductMedia {
  file_name: string;
  file_path: string;
}

export interface IInnovation extends Document {
  product_name: string;
  year_invented: string;
  country: string;
  cost: number;
  product_chain: string | string[];
  product_phase: string;
  product_use: string[];
  product_description: string;
  product_media: IProductMedia[];
  is_example: boolean;
  product_example?: any[];
  product_instruction?: any[];
  product_inventor?: any[];
  product_supplier?: any[];
  product_guidelines?: any[];
  is_gender_friendly: boolean;
  product_gender_description?: string;
}

const innovationSchema: Schema<IInnovation> = new Schema(
  {
    product_name: { type: String, required: true },
    year_invented: { type: String, required: true },
    country: { type: String, required: true },
    cost: { type: Number, required: true },
    product_chain: [{ type: String }],
    product_phase: { type: String, required: true },
    product_use: [{ type: String, required: true }],
    product_description: { type: String, required: true },
    product_media: [
      {
        name: String,
        url: String,
      },
    ],
    is_example: { type: Boolean, required: true },
    product_example: [{ type: Array, default: [] }],
    product_instruction: [{ type: Array, default: [] }],
    product_inventor: [{ type: Array, default: [] }],
    product_supplier: [{ type: Array, default: [] }],
    product_guidelines: [{ type: Array, default: [] }],
    is_gender_friendly: { type: Boolean },
    product_gender_description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Innovation: Model<IInnovation> = mongoose.model<IInnovation>(
  "Innovation",
  innovationSchema
);

export default Innovation;
