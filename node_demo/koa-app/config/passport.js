const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys"); //生成token时所需的
const User = require("../models/User");


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

/**
 * @description 导出一个函数
 * @param passport 参数passport为index.js回调过来的
 */

module.exports = passport => { //导出的是一个有参数的函数 类似koa与koa-router
  // console.log(passport)
  passport.use(
      //done是一个回调函数
    new JwtStrategy(opts,async function(jwt_payload, done) {
       // console.log(jwt_payload);
        const user = await User.findById(jwt_payload.id); //根据token中信息查询
        if(user){ //用户存在
            return done(null,user); //返回用户信息 koa-jwt将校验后的用户信息放在上下文State对象上
        }else{
            return done(null,false); 
        }
    })
  );
};
