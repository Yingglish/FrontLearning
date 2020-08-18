<template>
  <div>
     <!-- 子组件使用父组件传递过的数据 -->
    <div v-bind:key="todo.id" v-for="todo in todos">
      <!-- 子组件使用父组件传递过的方法,并命名为del-todo再次传给子组件的子组件 -->
      <TodoItem v-bind:todo="todo" @del-todo="$emit('del-todo', todo.id)" />
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
  name: "Todos",
  components: {
    TodoItem
  },
  props: ["todos"]
}
</script>


