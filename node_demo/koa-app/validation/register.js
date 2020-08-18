const Validator = require("validator");
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors={};
    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name='名字长度小于30大于2'
    }
    if(Validator.isEmpty(data.name)){
        errors.name = '名字不能为空';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = '邮箱不能为空';
    }
    if(!Validator.isEmail(data.email)){
        errors.email="邮箱不合法"
    }
    if(Validator.isEmpty(data.password)){
        errors.password = '密码不能为空';
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}
