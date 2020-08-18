<template>
  <div id="tabs" v-cloak>
    <tabs v-model="activeKey">
      <pane label="标签一" name="1">标签一的内容</pane>
      <!-- 主题内容由父级控制 -->
      <pane label="标签二" name="2">标签二的内容</pane>
      <pane label="标签三" name="3">标签三的内容</pane>
    </tabs>
  </div>
</template>

<script>
import pane from '../components/pane.vue';
import tabs from '../components/tabs.vue';
export default {
  name:'about',
  components:{
    pane,
    tabs
  }
}
</script>


