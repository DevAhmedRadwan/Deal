import bcrypt from "bcrypt";
import mongoose, { Schema } from "mongoose";
import { USER_ROLE } from "../enums/user-role.enum";
import { USER_STATUS } from "../enums/user-status.enum";
import IUserModel from "../interfaces/user-model.interface";
import IUser from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true, maxlength: 100, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: USER_ROLE,
      trim: true,
      maxlength: 20,
      required: true,
      default: USER_ROLE.CLIENT,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      trim: true,
      maxlength: 100,
      required: true,
      default: USER_STATUS.ACTIVE,
    },
    password: { type: String, trim: true, maxlength: 100, required: true },
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    ads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ad" }],
  },
  {
    methods: {
      isPasswordMatch: async function (password: string) {
        const user = this;
        return bcrypt.compare(password, user.password);
      },
    },
    statics: {
      isPhoneTaken: async function (phone: string) {
        const user = await this.findOne({ phone }).exec();
        return !!user;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model<IUser, IUserModel>("User", userSchema);

export default User;
