# vuex
每一个 `Vuex` 应用的核心就是 `store`（仓库）。`store`基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：
1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## state访问状态对象
#### 1.通过computed的计算属性直接赋值
computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值
```javascript
    computed: {
      count() {
        return store.state.count
      }
    },
```
#### 2.通过mapState的对象来赋值
```js
// 对应state , 同理 mapGetters,mapMutations对应着store.js中的getters,mutations
import {mapState} from 'vuex';
```

```js
computed:mapState({
        count:state=>state.count
 })
```

#### 3.通过mapState的数组来赋值
```js
computed:mapState(["count"])
```
