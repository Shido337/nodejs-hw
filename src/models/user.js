import { Schema, model } from 'mongoose';

const DEFAULT_AVATAR =
  'https://ac.goit.global/fullstack/react/default-avatar.jpg';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      required: false,
      default: DEFAULT_AVATAR,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

userSchema.pre('save', function () {
  if (this.isNew && !this.username) {
    this.username = this.email;
  }
});

export const User = model('User', userSchema, 'users');
