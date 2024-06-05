import mongoose, { Document, Schema, Model } from 'mongoose';
import { IInnovation } from './innovations.model';
import { ISupplier } from './suppliers.model';

interface IInventor extends Document {
  innovation_id: mongoose.Types.ObjectId | IInnovation;
  isInventor: boolean;
  inventor_name: string;
  inventor_email: string;
  inventor_phone: string;
  inventor_country: string;
  supplier_ids: (mongoose.Types.ObjectId | ISupplier)[];
}

const inventorSchema: Schema<IInventor> = new Schema({
  innovation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Innovation',
    required: true
  },
  isInventor: { type: Boolean, required: true },
  inventor_name: { type: String, required: true },
  inventor_email: { type: String, required: true },
  inventor_phone: { type: String, required: true },
  inventor_country: { type: String, required: true },
  supplier_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }],
}, {
  timestamps: true
});

const Inventor: Model<IInventor> = mongoose.model<IInventor>('Inventor', inventorSchema);

export default Inventor;
