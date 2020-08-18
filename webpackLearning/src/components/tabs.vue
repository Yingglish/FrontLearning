<template>
  <div class="tabs">
    <div class="tabs-bar">
      <div
        :class="tabCls(item)"
        v-for="(item,index) in navList" :key="item"
        @click="handleChange(index)"
      >{{item.label}}</div>
    </div>
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:'tabs',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data() {
    return {
      currentValue: this.value,
      navList: []
    };
  },
  methods: {
    tabCls(item) {
      return [
        "tabs-tab",
        {
          "tabs-tab-active": item.name === this.currentValue
        }
      ];
    },
    getTabs() {
      return this.$children.filter(function(item) {
        return item.$options.name === "pane";
      });
    },
    updateNav() {
      this.navList = [];
      var _this = this;

      this.getTabs().forEach(function(pane, index) {
        _this.navList.push({ //将pane组件信息传递给父组件
          label: pane.label,
          name: pane.name || index
        });
        if (!pane.name) {
          pane.name = index;
        }
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index;
          }
        }
      });
      this.updateStatus();
    },
    /**
     *  改变标签显示状态
     */
    updateStatus() {
      var tabs = this.getTabs();
      var _this = this;

      tabs.forEach(function(tab) {
        return (tab.isShow = tab.name === _this.currentValue);
      });
    },
    /* 改变标签 */
    handleChange(index) {
      var nav = this.navList[index];
      console.log(nav);
      var name = nav.name;

      this.currentValue = name;
      this.$emit("input", name);
      this.$emit("on-click", name); //触发onClick事件绑定的自定义函数
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue() {
      this.updateStatus();
    }
  }
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}

.tabs {
  font-size: 14px;
  color: #657180;
}

.tabs-bar:after {
  content: "";
  display: block;
  width: 10;
  height: lpx;
  background: #d7dde4;
  margin-top: -lpx;
}

.tabs-tab {
  display: inline-block;
  padding: 4px 16px;
  margin-right: 6px;
  background: #fff;
  border: lpx solid #d7dde4;
  cursor: pointer;
  position: relative;
}

.tabs-tab-active {
  color: #3399ff;
  border-top: lpx solid #3399ff;
  border-bottom: lpx sol id #fff;
}

.tabs-tab-active:before {
  content: "";
  display: block;
  height: lpx;
  background: #3399ff;
  position: absolute;
  top: O;
  left: 0;
  right: 0;
}

.tabs-content {
  padding: 8px 0;
}
</style>

