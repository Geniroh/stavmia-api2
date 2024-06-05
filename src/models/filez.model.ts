import mongoose, { Document, Schema } from 'mongoose';

interface IFilez extends Document {
    filename: string;
    size: string;
    url: string;
    uploadedAt: Date;
}

const filezSchema: Schema = new Schema({
    filename: { type: String, required: true },
    size: { type: String, required: true },
    url: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Filez = mongoose.model<IFilez>('Filez', filezSchema);

export default Filez;
