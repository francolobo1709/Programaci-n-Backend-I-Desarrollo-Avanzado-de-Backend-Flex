import mongoose from 'mongoose';

const VALID_ROLES = ['cliente', 'prestador'];

const userSchema = new mongoose.Schema(
    {
        nombre:   { type: String, required: true, trim: true },
        apellido: { type: String, required: true, trim: true },
        email:    { type: String, required: true, trim: true, lowercase: true, unique: true },
        telefono: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        rol:      { type: String, enum: VALID_ROLES, required: true },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);