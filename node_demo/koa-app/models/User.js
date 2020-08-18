/**
 * @description 用户模型
 */
const mongoose = require("mongoose");
const scheam = require("mongoose").Schema;

/* 定义一个 Schema */
const UserScheam = new scheam({
  name: { //属性name,类型为String
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    /*头像 */
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserScheam);
