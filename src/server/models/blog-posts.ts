import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImgurl: {
      type: String,
      required: true,
    },
    datePublished: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toObject: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
    collection: "blog-posts",
  }
);

export type BlogPost = InferSchemaType<typeof blogPostSchema> & { id: string };

export const BlogPostModel: Model<BlogPost> =
  models.BlogPost || model<BlogPost>("BlogPost", blogPostSchema);
