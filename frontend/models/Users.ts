import mongoose, { Schema, Document } from 'mongoose';

export enum UserRoles {
    DESIGNER = "designer",
    MANUFACTURER = "manufacturer",
    SELLER = "seller",
    USER = "user"
}

export interface IUser extends Document {
    email: string
    password: string
    isVerified: boolean
    token?: string
    roles: UserRoles[]
    portfolio?: string
    designs?: Schema.Types.ObjectId[]
    rating?: number
    products?: Array<{
        _id: Schema.Types.ObjectId
        rating: number
        sizes: string[]
    }>
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            default: null
        },
        roles: {
            type: [String],
            enum: Object.values(UserRoles),
            default: [UserRoles.USER]
        },
        portfolio: {
            type: String
        },
        designs: [{
            type: Schema.Types.ObjectId,
            ref: "Design"
        }],
        rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
        },
        products: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
                default: 0
            },
            sizes: [String]
        }]
    },
    { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);