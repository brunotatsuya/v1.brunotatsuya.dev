import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const adminUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
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
    collection: "admin-users",
  }
);

export type AdminUser = InferSchemaType<typeof adminUserSchema> & {
  id: string;
};

export const AdminUserModel: Model<AdminUser> =
  models.AdminUser || model<AdminUser>("AdminUser", adminUserSchema);
