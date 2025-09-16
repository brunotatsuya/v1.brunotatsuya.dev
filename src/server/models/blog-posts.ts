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
    },
    content: {
      type: String,
    },
    coverImgurl: {
      type: String,
    },
    datePublished: {
      type: String,
    },
    dateModified: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
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
