<template>
  <div>
    <div :class="{'active' : isActive }">利用对象绑定</div>
    <!-- 渲染为 <div class = "active"></div> -->
    <div :class="classes">利用计算属性绑定</div>
    <div :class="[str1 , str2]">利用数组绑定</div>
    <div :class="[isActive?str1:str2]">利用三元表达式切换</div>
  </div>
</template>

<script>
export default {
  data: {
    isActive: true,
    isError: false,
    error: null,
    str1: "active",
    str2: "error"
  },
  computed: {
    //返回一个`对象`的 计算属性
    classes: function() {
      return {
        active: this.isActive && !this.error,
        "text-danger": this.error && this.error.type === "fatal" //this指向vm实例
      };
    }
  }
};
</script>

