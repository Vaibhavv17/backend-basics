import mongoose , {Schema} from mongoose;
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema (
  {
    videoFile: {
      type: String, //cloudinary url
      required: true
    },
    thumbnail: {
      type: String, //cloudinary url
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number, //cloudinary pe jese hi video upload karo toh voh details bhejta hai vahase nikalenge
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished : {
      type: Boolean,
      default: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

//bcrypt hash karta hai passwords

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema )