import mongoose, { Schema, Document } from "mongoose"
import { UserRoles } from "@/lib/constants/userRoles" // Import from the new location

export interface IDesign {
    imgSrc: string
    projectName: string
    projectDescription: string
    category: string
}

export interface IProduct {
    _id: Schema.Types.ObjectId
    rating: number
    sizes: string[]
}

export interface IUser extends Document {
    firstName: string
    lastName: string
    email: string
    password: string
    isVerified: boolean
    token?: string
    expiryTime?: Date
    roles: UserRoles[]
    // Designer fields
    portfolio?: IDesign[]
    followers?: {
        instagram?: number
        pinterest?: number
        twitter?: number
        deviantart?: number
        total?: number
    }
    projectsCompleted?: number
    specialisationDesigner?: string
    bioDesigner?: string
    ratingDesigner?: number
    noRatersDesigner?: number
    // Manufacturer fields
    name?: string
    city?: string
    ratingManu?: number
    noReviews?: number
    minQuantity?: number
    capacity?: number
    price?: number
    // Seller fields
    products?: IProduct[]
    createdAt: Date
    updatedAt: Date
}

const designSchema = new Schema<IDesign>(
    {
        imgSrc: { type: String, required: true },
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        category: { type: String, required: true }
    },
    { _id: false }
)

const productSchema = new Schema<IProduct>(
    {
        _id: { type: Schema.Types.ObjectId, ref: "Product" },
        rating: { type: Number, min: 0, max: 5, default: 0 },
        sizes: [String]
    },
    { _id: false }
)

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
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
        expiryTime: {
            type: Date
        },
        roles: {
            type: [String],
            enum: Object.values(UserRoles),
            default: [UserRoles.USER]
        },
        // Designer fields
        portfolio: [designSchema],
        followers: {
            instagram: { type: Number, default: 0 },
            pinterest: { type: Number, default: 0 },
            twitter: { type: Number, default: 0 },
            deviantart: { type: Number, default: 0 },
            total: { type: Number, default: 0 }
        },
        projectsCompleted: { type: Number, default: 0 },
        specialisationDesigner: { type: String },
        bioDesigner: { type: String },
        ratingDesigner: { type: Number, min: 0, max: 5, default: 0 },
        noRatersDesigner: { type: Number, default: 0 },
        // Manufacturer fields
        name: { type: String },
        city: { type: String },
        ratingManu: { type: Number, min: 0, max: 5, default: 0 },
        noReviews: { type: Number, default: 0 },
        minQuantity: { type: Number, default: 0 },
        capacity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        // Seller fields
        products: [productSchema]
    },
    { timestamps: true }
)

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)