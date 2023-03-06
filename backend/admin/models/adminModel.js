const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const adminSchema = Schema(
  {
    userId: {
      type: String,
      default: shortid.generate,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

adminSchema.methods.generateJWT = () => {
  const token = jwt.sign(
    {
      _id: this._id,
      mobile: this.mobile,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = model("admins", adminSchema);
