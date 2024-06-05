import mongoose, { Document, Model } from 'mongoose';

export interface ISupplier extends Document {
    supplier_name: String;
    supplier_email: String;
    supplier_phone: string;
}

const supplierSchema = new mongoose.Schema({
    supplier_name: { type: String, required: true },
    supplier_email: { type: String, required: true },
    supplier_phone: { type: String, required: true },
}, {
    timestamps: true
})

const Supplier: Model<ISupplier> = mongoose.model<ISupplier>("Supplier", supplierSchema) 
export default Supplier