import mongoose, { Schema } from "mongoose";

const subcriptionSchema= new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps:true});

const Subscipton =mongoose.model("Subsciption",subcriptionSchema);