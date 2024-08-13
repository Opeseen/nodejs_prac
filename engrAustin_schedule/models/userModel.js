const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define Schema Section
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      required: [true, 'Please tell us your firstname']
    },
    lastname: {
      type: String,
      lowercase: true,
      required: [true, 'Please tell us your lastname']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    role: {
      type: String,
      enum: ['user','admin'],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      private: true
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(element) {
          return element === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },
    passwordChangedAt: { 
      type: Date,
      private: true
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      private: true
    },
  }
);

// Middleware Section
userSchema.pre('save', async function(next){
  const user = this
  if(!user.isModified('password')) { 
    return next()
  }; // ONLY RUN IF PASSWORD WAS NOT MODIFIED

  user.password = await bcrypt.hash(user.password, 12);
  user.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function(next){
  const user = this
  if(!user.isModified('password') || user.isNew) {
    return next()
  }; // ONLY RUN IF PASSWORD WAS NOT MODIFIED OR PASSWORD CREATION IS NEW NEW

  user.passwordChangedAt = Date.now() - 1000;
  next();
});

// This method will Compare the user entered password with the database password
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// This will check of the user changed his password after token has been issued
userSchema.methods.changedPasswordAfter = function(JWTtimestamp){
  const user = this;
  if(user.passwordChangedAt){
    const changeTimeStamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
    return JWTtimestamp < changeTimeStamp; // TRUE MEANS PASSWORD HAS BEEN CHANGED
  };
  return false; // FALSE MEANS PASSWORD HAS NOT BEEN CHANGED
};

userSchema.plugin(toJson);

const User = mongoose.model('User', userSchema);

module.exports = User;