var app1 = new Vue({
  el: '#app-1', // 指定用于挂载 vue实例的dom元素
  data: {
    message: 'Hello World!',
    seen: true
  }
});

console.log(app1.$el);

var app2 = new Vue({
  el : '#app-2',
  data:{
    message: '页面加载于' + new Date().toLocaleDateString(),
    getTitle:function(){
      return "hahaha1";
   }
     },
     computed: {
       //计算属性的getter
      getTitle_1:function(){
        return Date.now();
     }
  }
})
var app3 = new Vue({
  el: '#app-3',
  data:{
    todos:[
      { text : "学习英语" },
      { text : "学习Vue" },
      { text : "学习activiti框架" },
      { text : "学习struct2" },
      { text : "学习spring Boot" },
      { text : "写好三个项目开发文档"} 
    ]
  }
})
var app4 = new Vue({
  el: '#app-4',
  data:{
    message: "Hello Vue.js"
  },
  methods: {
    reverseMessage : function() {
      this.message = this.message.split('').reverse().join('')
    },
  }
})
var app5 = new Vue({
  el : '#app-5',
  data:{
    message: 'Hello World!'
  }
})

// 在Vue中，一个组件实质上是一个拥有预定义选项的Vue实例

// 注册名为 todo-item的新组件
Vue.component('todo-item',{
  //todo-item组件接受一个prop
  //"prop" 类似于一个自定义特性
  // 这个prop名为todo
  props:['todo'],
  template:'<li>text: {{ todo.text }}  --  id: {{todo.id}}</li>'
})
var app6 = new Vue({
  el: "#app-6",
  data:{
    groceryList:[
      { id : 1 ,text: '蔬菜'},
      { id : 4 ,text: '新插入的数据'},
      { id : 2 ,text: '奶酪'},
      { id : 3 ,text: '随便咯'}
    ]
  }
})

var obj = {
  name: 'Tom',
  age:22
};

obj.toString = function(){
  var str = '[';
  for(var i in this){
    str += i + ':' + this[i] + ' ';
  }
  str += "]";
  return str;
};

Object.defineProperty(obj, 'toString', {'enumerable': false}); // 防止 toString 方法自身被遍历出来

var app7 = new Vue({
  el:"#app-7",
  data:{
    obj:obj
  }
})
